/* eslint-disable no-console, prefer-promise-reject-errors */
const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const clearConsole = require('react-dev-utils/clearConsole');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const ucfirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

function createCompilationPromise(name, compiler, config) {
  return new Promise((resolve, reject) => {
    const filterStats = config.stats || {
      all: false,
      warnings: true,
      errors: true,
    };
    let watching = false;
    compiler.hooks.compile.tap(name, () => {
      if (watching && name === 'server') {
        clearConsole();
      }
      console.info(`Compiling ${name}...`);
    });

    compiler.hooks.done.tap(name, (stats) => {
      const statsData = stats.toJson(filterStats);
      const messages = formatWebpackMessages(statsData);
      const isSuccessful = !messages.errors.length && !messages.warnings.length;

      if (isSuccessful && !watching) {
        watching = true;
        console.log(
          `\n${chalk.bgGreen.black(' DONE ')}`,
          chalk.green(`${ucfirst(name)} compiled successfully!`)
        );
      }

      // If errors exist, only show errors.
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        console.log(chalk.red('Failed to compile.\n'));
        console.log(messages.errors.join('\n\n'));
        reject(new Error('Compilation failed!'));
      }

      // Show warnings if no errors were found.
      if (messages.warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(messages.warnings.join('\n\n'));

        // Teach some ESLint tricks.
        console.log(
          `\nSearch for the ${chalk.underline(
            chalk.yellow('keywords')
          )} to learn more about each warning.`
        );
        console.log(
          `To ignore, add ${chalk.cyan(
            '// eslint-disable-next-line'
          )} to the line before.\n`
        );
      }
      // return stats once done compilation
      resolve(stats);
    });
  });
}

const logLevel = 0;
const logger = {
  info: (...msgs) => {
    if (logLevel > 0) return;
    console.log(chalk.bgYellowBright.black.bold(' HMR '), ...msgs);
  },
  log: (...msgs) => {
    if (logLevel > 1) return;
    console.log(chalk.bgGreenBright.black.bold('\n HMR '), ...msgs);
  },
  error: (...msgs) => {
    if (logLevel > 2) return;
    console.log(chalk.bgRedBright.black.bold(' HMR '), ...msgs);
  },
};

function getFilename(serverStats, chunkName = 'main') {
  const stats = serverStats.toJson({
    chunks: false,
    modules: false,
    errors: false,
    warnings: false,
  });
  const { assetsByChunkName, outputPath } = stats;
  const filename = assetsByChunkName[chunkName] || '';
  // If source maps are generated `assetsByChunkName.main`
  // will be an array of filenames.
  return path.join(
    outputPath,
    Array.isArray(filename)
      ? filename.find((asset) => /\.js$/.test(asset))
      : filename
  );
}

const devCompiler = (config, options) => {
  // Do async job
  return new Promise((resolve, reject) => {
    let compiler;
    let assetPath = '';
    const clientConfig = config.find((c) => c.name === 'client');
    const serverConfig = config.find((c) => c.name === 'server');

    try {
      compiler = webpack(config);
    } catch (err) {
      console.log(chalk.red('Failed to compile.\n'));
      console.log(err.message || err);
      console.log();
      reject(0);
    }

    const clientCompiler = compiler.compilers.find((c) => c.name === 'client');
    const serverCompiler = compiler.compilers.find((c) => c.name === 'server');

    const clientPromise = createCompilationPromise(
      'client',
      clientCompiler,
      clientConfig
    );

    const serverPromise = createCompilationPromise(
      'server',
      serverCompiler,
      serverConfig
    );

    const devMiddleware = webpackDevMiddleware(clientCompiler, {
      // hot: true,
      logLevel: 'error',
      publicPath: options.publicPath,
      progress: false,
      writeToDisk: true,
      stats: 'error-only',
    });

    const hotMiddleware = webpackHotMiddleware(clientCompiler, {
      log: false,
      path: '/__webpack_hmr',
      heartbeat: 3000,
    });

    let app;
    let appPromise;
    let appPromiseResolve;
    let appPromiseIsResolved = true;

    serverCompiler.hooks.compile.tap('server', () => {
      if (!appPromiseIsResolved) return;
      appPromiseIsResolved = false;
      // eslint-disable-next-line no-return-assign
      appPromise = new Promise((_resolve) => {
        appPromiseResolve = _resolve;
        return appPromiseResolve;
      });
    });

    const hotServerMiddleware = (req, res) => {
      appPromise
        .then(() => app.handle(req, res))
        .catch((error) => console.error(error));
    };

    function checkForUpdate(fromUpdate) {
      if (!app.hot) {
        throw new Error('Hot Module Replacement is disabled.');
      }
      if (app.hot.status() !== 'idle') {
        return Promise.resolve();
      }
      return app.hot
        .check(true)
        .then((updatedModules) => {
          if (!updatedModules) {
            if (fromUpdate) {
              setTimeout(() => {
                clearConsole();
                logger.log('Update applied.');
              }, 1000);
            }
            return;
          }
          if (updatedModules.length === 0) {
            logger.log('Nothing hot updated.');
          } else {
            logger.info('Updated modules:');
            updatedModules.forEach((moduleId) => logger.info(`- ${moduleId}`));
            checkForUpdate(true);
          }
        })
        .catch((error) => {
          if (['abort', 'fail'].includes(app.hot.status())) {
            clearConsole();
            logger.error(`Cannot apply update.`);
            delete require.cache[require.resolve(assetPath)];
            // eslint-disable-next-line global-require, import/no-dynamic-require
            app = require(assetPath).default;
            logger.log(`App has been reloaded.`);
          } else {
            logger.error(`Update failed: ${error.stack || error.message}`);
          }
        });
    }

    serverCompiler.watch({}, (error, stats) => {
      if (app && !error && !stats.hasErrors()) {
        checkForUpdate().then(() => {
          appPromiseIsResolved = true;
          appPromiseResolve();
        });
      }
    });

    Promise.all([clientPromise, serverPromise])
      .then((stats) => {
        assetPath = getFilename(stats[1]);
        // eslint-disable-next-line global-require, import/no-dynamic-require
        app = require(assetPath).default;
        appPromiseIsResolved = true;
        appPromiseResolve();
        resolve([devMiddleware, hotMiddleware, hotServerMiddleware]);
      })
      .catch(() => {
        reject(0);
      });
  });
};

module.exports = devCompiler;
