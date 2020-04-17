const merge = require('webpack-merge');
const path = require('path');
const parts = require('./webpack.parts');

const root = process.cwd();
const srcDir = path.resolve(root, 'src');
const serverEntry = path.resolve(root, 'src/server/index');
const outputDir = path.resolve('dist/server');

module.exports = merge([
  {
    name: 'server',
    mode: 'development',
    target: 'node',
    context: root,
    devtool: 'cheap-module-eval-source-map',
    resolve: {
      modules: [srcDir, 'node_modules'],
      extensions: ['.js', '.jsx', '.css'],
    },
    entry: serverEntry,
    output: {
      path: outputDir,
      filename: '[name].js',
      publicPath: '/assets/',
      libraryTarget: 'commonjs2',
      // chunkFilename: '[name].js',
    },
    node: {
      fs: 'empty',
    },
  },
  parts.nodeExternals({
    whitelist: [/@babel\/runtime/],
  }),
  parts.loadScripts(),
  parts.loadStyles(),
  parts.loadAssets(),
  parts.cleanBuildFolder(),
  // parts.bundleAnalyzer(),
  parts.loadableStats(),
  parts.defineConstants({
    IS_CLIENT_BUILD: false,
  }),
]);
