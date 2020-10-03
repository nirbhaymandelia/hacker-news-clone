const { merge } = require('webpack-merge');
const path = require('path');
const parts = require('./webpack.parts');

const root = process.cwd();
const srcDir = path.resolve(root, 'src');
const clientEntry = path.resolve(root, 'src/client/index');
const outputDir = path.resolve('dist/client');

module.exports = merge([
  {
    name: 'client',
    mode: 'development',
    target: 'web',
    context: root,
    devtool: 'cheap-module-eval-source-map',
    resolve: {
      modules: [srcDir, 'node_modules'],
      extensions: ['.js', '.jsx', '.css'],
      alias: { 'react-dom': '@hot-loader/react-dom' },
    },
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=true',
      clientEntry,
    ],
    output: {
      path: outputDir,
      filename: '[name].js',
      publicPath: '/assets/',
      chunkFilename: '[name].js',
    },
  },
  parts.enableHotReload(),
  parts.loadScripts(),
  parts.loadStyles({ hmr: true }),
  parts.loadAssets(),
  parts.cleanBuildFolder(),
  parts.bundleAnalyzer(),
  parts.loadableStats(),
  parts.defineConstants({
    IS_CLIENT_BUILD: true,
  }),
]);
