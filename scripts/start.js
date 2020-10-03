/* eslint-disable no-console */
const chalk = require('chalk');
// const path = require('path');
// const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const {
  choosePort,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

const express = require('express');
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
      const devServer = express();
      const urls = prepareUrls('http', HOST, port);
      devServer.use(middlewares);
      // eslint-disable-next-line consistent-return
      devServer.listen(port, HOST, (err) => {
        if (err) {
          return console.log(err);
        }

        if (isInteractive) {
          // clearConsole();
        }

        console.info(chalk.white('\n✅ Client-side 🔥HMR Enabled!'));
        console.info(chalk.white('✅ Server-side 🔥HMR Enabled!'));
        console.info(chalk.blue('\n> Starting dev server...'));
        console.info(
          chalk.blue(`> Running locally at ${urls.localUrlForBrowser}`)
        );
        console.info(
          chalk.blue(
            `> Running on your network at ${urls.lanUrlForConfig}:${port}\n`
          )
        );
        openBrowser(urls.localUrlForBrowser);
      });
    });
  });
}

start([clientConfig, serverConfig]);
