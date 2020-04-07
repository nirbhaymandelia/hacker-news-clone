/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const merge = require("webpack-merge");
const path = require("path");
const parts = require("./webpack.parts");

const root = process.cwd();
const srcDir = path.resolve(root, "src");
const serverEntry = path.resolve(root, "src/server/index");
const outputDir = path.resolve("dist/server");

merge([
  {
    name: "server",
    mode: "production",
    target: "node",
    context: root,
    devtool: "cheap-module-eval-source-map",
    resolve: {
      modules: [srcDir, "node_modules"],
      extensions: [".js", ".jsx", ".css"],
    },
    entry: serverEntry,
    output: {
      path: outputDir,
      filename: "bundle.js",
      publicPath: "/assets/",
      libraryTarget: "commonjs2",
      // chunkFilename: '[name].js',
    },
    node: {
      fs: "empty",
    },
  },
  parts.loadScripts(),
  parts.loadStyles(),
  parts.loadAssets(),
  parts.cleanBuildFolder(),
  parts.bundleAnalyzer(),
  parts.loadableStats(),
]);
