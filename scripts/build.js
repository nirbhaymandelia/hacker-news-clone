/* eslint-disable consistent-return */
const chalk = require('chalk');
const webpack = require('webpack');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

process.env.NODE_ENV = 'production';
process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';

process.on('unhandledRejection', (err) => {
  // console.log(err);
  throw err;
});

const clientProdConfig = require('./webpack/client.prod');
const serverProdConfig = require('./webpack/server.prod');

function printResult({ warnings }) {
  if (warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.\n'));
    console.log(warnings.join('\n\n'));
  } else {
    console.log(chalk.green('Compiled successfully.\n'));
  }
}

function build(clientConfig, serverConfig) {
  console.log(chalk.blue('\n\tCreating an optimized production build...\n'));

  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);

  return new Promise((resolve, reject) => {
    clientCompiler.run((clientErr, stats) => {
      if (clientErr) {
        return reject(clientErr);
      }
      // console.log(stats);
      console.log(chalk.white('✓ Client webpack build complete'));

      serverCompiler.run((serverErr) => {
        if (serverErr) {
          return reject(serverErr);
        }
        console.log(chalk.white('✓ Server webpack build complete'));

        const messages = formatWebpackMessages(stats.toJson({}, true));

        if (messages.errors.length) {
          return reject(new Error(messages.errors.join('\n\n')));
        }

        resolve({
          stats,
          warnings: messages.warnings,
        });
      });
    });
  }).then(
    (result) => printResult(result),
    (err) => {
      console.log(chalk.red('Failed to compile.\n'));
      console.log(`${err.message || err}\n`);
      process.exit(1);
    }
  );
}

build(clientProdConfig, serverProdConfig);
