/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const applyDevMiddleware = (app, config) => {
  return new Promise((resolve, reject) => {
    // Do async job
    const compiler = webpack(config);
    app.use(
      webpackDevMiddleware(compiler, {
        hot: true,
        publicPath: config.output.publicPath,
        progress: true,
        writeToDisk: true,
        stats: {
          colors: true,
          assets: true,
          chunks: false,
          modules: false,
          hash: false,
        },
      }),
    );

    app.use(
      webpackHotMiddleware(compiler, {
        path: '/__webpack_hmr',
        heartbeat: 4000,
      }),
    );

    compiler.hooks.done.tap('devMiddleware', stats => {
      // Stats Object
      if (stats.hasErrors()) {
        // Handle errors here
        reject(stats);
      }
      // Done processing
      resolve(stats);
    });
  });
};

module.exports = applyDevMiddleware;
