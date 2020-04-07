/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = path.resolve(process.cwd(), "../../../");
const distClient = "dist/client";
const distServer = "dist/server";
const statsFile = "loadable-stats.json";
const masterPackagePath = "packages/apps/master";

const loadJSON = (file) => {
  try {
    const data = fs.readFileSync(file, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    console.log("Error loading file:", file);
  }
  return null;
};

const copy = (src, dest) => {
  const srcFile = fs.createReadStream(src);
  const distFile = fs.createWriteStream(dest);
  srcFile.pipe(distFile);
};

function writeFileToJson(json, fileName) {
  fs.writeFile(json, fileName, "utf8", (err) => {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    return console.log("JSON file has been saved.");
  });
}

const getClientBuildPath = (pkgPath) => {
  return `${root}/${pkgPath}/${distClient}`;
};

const getServerBuildPath = (pkgPath) => {
  return `${root}/${pkgPath}/${distServer}`;
};

function copyToMaster(stats, outputPath) {
  const exclude = ["main", "runtime"];
  const { assetsByChunkName } = stats;
  const sourcePath = stats.outputPath;
  Object.keys(assetsByChunkName).forEach((key) => {
    const asset = assetsByChunkName[key];
    if (exclude.indexOf(key) === -1 && asset) {
      if (Array.isArray(asset)) {
        asset.map((fileName) => {
          const src = `${sourcePath}/${fileName}`;
          const dist = `${outputPath}/${fileName}`;
          copy(src, dist);
          return console.log(`created asset ${dist}`);
        });
      }
      if (typeof asset === "string") {
        const src = `${sourcePath}/${asset}`;
        const dist = `${outputPath}/${asset}`;
        copy(src, dist);
        return console.log(`created asset ${dist}`);
      }
    }
  });
}

const merge = (target, source) => {
  const isObject = (obj) => obj && typeof obj === "object";
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];
    // Join `target` and modified `source`
    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = merge(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
};

function mergeStats(base, source) {
  const assetsByChunkName = merge(
    base.assetsByChunkName,
    source.assetsByChunkName
  );
  const namedChunkGroups = merge(
    base.namedChunkGroups,
    source.namedChunkGroups
  );
  return {
    ...base,
    assetsByChunkName,
    namedChunkGroups,
  };
}

function copyAssets() {
  const rootPkg = loadJSON(`${root}/lerna.json`);
  const { packages } = rootPkg;
  const clientStats = {};
  const serverStats = {};
  const masterStatsPath = `${getClientBuildPath(
    masterPackagePath
  )}/${statsFile}`;
  let masterStats = loadJSON(masterStatsPath);
  packages.forEach((pkgPath) => {
    if (
      /^packages\/apps\/[\S]{3,20}$/.test(pkgPath) &&
      pkgPath !== masterPackagePath
    ) {
      const appName = pkgPath.split("/").pop();
      clientStats[appName] = loadJSON(
        `${getClientBuildPath(pkgPath)}/${statsFile}`
      );
      serverStats[appName] = loadJSON(
        `${getServerBuildPath(pkgPath)}/${statsFile}`
      );
      copyToMaster(clientStats[appName], getClientBuildPath(masterPackagePath));
      copyToMaster(serverStats[appName], getServerBuildPath(masterPackagePath));
      masterStats = mergeStats(masterStats, clientStats[appName]);
    }
  });
  writeFileToJson(masterStatsPath, JSON.stringify(masterStats));
}

copyAssets();
// console.log(root, rootPkg.workspaces);
