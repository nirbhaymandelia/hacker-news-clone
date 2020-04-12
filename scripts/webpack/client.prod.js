const merge = require('webpack-merge');
const path = require('path');
const parts = require('./webpack.parts');

const root = process.cwd();
const srcDir = path.resolve(root, 'src');
const clientEntry = path.resolve(root, 'src/client/index');
const outputDir = path.resolve('dist/client');

module.exports = merge([
  {
    name: 'client',
    mode: 'production',
    target: 'web',
    context: root,
    devtool: 'source-map',
    resolve: {
      modules: [srcDir, 'node_modules'],
      extensions: ['.js', '.jsx', '.css'],
    },
    entry: clientEntry,
    output: {
      path: outputDir,
      filename: '[name].[contenthash].js',
      publicPath: '/assets/',
      chunkFilename: '[name].[contenthash].js',
    },
    performance: false,
  },
  parts.loadScripts(),
  parts.loadStyles(),
  parts.loadAssets(),
  parts.cleanBuildFolder(),
  parts.bundleAnalyzer(),
  parts.loadableStats(),
]);
