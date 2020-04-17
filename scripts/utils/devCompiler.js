/* eslint-disable prefer-promise-reject-errors */
const webpack = require('webpack');
const chalk = require('chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const devCompiler = (config, options) => {
  // Do async job
  return new Promise((resolve, reject) => {
    let compiler;
    try {
      compiler = webpack(config);
    } catch (err) {
      console.log(chalk.red('Failed to compile.\n'));
      console.log(err.message || err);
      console.log();
      reject(0);
    }
    const devMiddleware = webpackDevMiddleware(compiler, {
      // hot: true,
      logLevel: 'error',
      publicPath: options.publicPath,
      progress: false,
      writeToDisk: true,
      stats: 'error-only',
    });
    const clientCompiler = compiler.compilers.find((c) => c.name === 'client');
    const hotMiddleware = webpackHotMiddleware(clientCompiler, {
      log: false,
      path: '/__webpack_hmr',
      heartbeat: 3000,
    });
    // "invalid" event fires when you have changed a file, and Webpack is
    // recompiling a bundle. WebpackDevServer takes care to pause serving the
    // bundle, so if you refresh, it'll wait instead of serving the old one.
    // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
    compiler.hooks.invalid.tap('devMiddlewareInvalid', () => {
      console.log('Compiling...');
    });
    compiler.hooks.done.tap('devMiddlewareDone', (stats) => {
      // Stats Object

      const statsData = stats.toJson({
        all: false,
        warnings: true,
        errors: true,
      });
      const messages = formatWebpackMessages(statsData);
      const isSuccessful = !messages.errors.length && !messages.warnings.length;
      if (isSuccessful) {
        console.log(
          `\n${chalk.bgGreen.black(' DONE ')} ${chalk.green(
            'Compiled successfully!'
          )}`
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
        reject(0);
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
      // return middlewares once done compilation
      resolve([devMiddleware, hotMiddleware]);
    });
  });
};

module.exports = devCompiler;
