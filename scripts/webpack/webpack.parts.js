const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

// Style files regex
const CSS_REGEX = /\.css$/;
// const CSS_MODULE_REGEX = /\.module\.css$/;
const CSS_MODULE_IDENT =
  process.env.NODE_ENV === 'production'
    ? '[name]_[hash:base62:6]'
    : '[local]--[hash:base62:6]';

exports.loadStyles = ({ hmr } = false) => ({
  module: {
    rules: [
      {
        test: CSS_REGEX,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr,
              // if hmr does not work, this is a forceful method.
              // reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                // This enable css modules for all files for which /\.module\.\w+$/i.test(filename) return true
                auto: true,
                localIdentName: CSS_MODULE_IDENT,
              },
              importLoaders: 1,
              esModule: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    }),
  ],
});

exports.loadServerStyles = () => ({
  module: {
    rules: [
      {
        test: CSS_REGEX,
        loader: 'css-loader',
        options: {
          modules: {
            // This enable css modules for all files for which /\.module\.\w+$/i.test(filename) return true
            auto: true,
            localIdentName: CSS_MODULE_IDENT,
          },
          esModule: true,
          onlyLocals: true,
        },
      },
    ],
  },
});

exports.loadScripts = () => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /dist/],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
});

exports.loadAssets = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
});

exports.cleanBuildFolder = () => ({
  plugins: [new CleanWebpackPlugin()],
});

exports.bundleAnalyzer = () => ({
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: false,
      logLevel: 'error',
    }),
  ],
});

exports.loadableStats = () => ({
  plugins: [new LoadablePlugin()],
});

exports.enableHotReload = () => ({
  plugins: [new HotModuleReplacementPlugin()],
});

exports.nodeExternals = (options) => ({
  externals: nodeExternals(options),
});

exports.defineConstants = (constants = {}) => ({
  plugins: [new DefinePlugin(constants)],
});
