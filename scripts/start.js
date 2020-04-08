const chalk = require('chalk');
// const path = require('path');
// const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const {
  choosePort,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

// const { purgeCacheOnChange } = require('./utils/purgeCacheOnChange');
const devCompiler = require('./utils/devCompiler');
const clientConfig = require('./webpack/client.dev');
const serverConfig = require('./webpack/server.dev');

process.env.NODE_ENV = 'development';
process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';

process.on('unhandledRejection', (err) => {
  // console.log(err);
  throw err;
});

function start(config) {
  const DEFAULT_PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || '0.0.0.0';
  const isInteractive = process.stdout.isTTY;
  const options = {
    publicPath: clientConfig.output.publicPath,
  };
  // We need to "inject" the dev middleware higher up in the stack of middlewares,
  // so applyDevMiddleware needs to happen before server.use()
  devCompiler(config, options).then((middlewares) => {
    choosePort(HOST, DEFAULT_PORT).then((port) => {
      if (!port) {
        return;
      }

      const urls = prepareUrls('http', HOST, port);
      // eslint-disable-next-line global-require, import/no-unresolved
      const server = require('../dist/server/main').default;
      server.use(middlewares);
      // eslint-disable-next-line consistent-return
      server.listen(port, HOST, (err) => {
        if (err) {
          return console.log(err);
        }

        if (isInteractive) {
          // clearConsole();
        }

        console.log(chalk.white('\n\tStarting dev server...'));

        openBrowser(urls.localUrlForBrowser);
        // console.log('######', path.resolve(__dirname, '../'));
        // purgeCacheOnChange(path.resolve(__dirname, '../'));

        console.log(
          chalk.blue(`
          Running locally at ${urls.localUrlForBrowser}
          Running on your network at ${urls.lanUrlForConfig}:${port}
        `)
        );
      });
    });
  });
}

start([clientConfig, serverConfig]);
