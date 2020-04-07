/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Style files regex
const CSS_REGEX = /\.css$/;
const CSS_MODULE_REGEX = /\.module\.css$/;
const CSS_MODULE_IDENT =
  process.env.NODE_ENV === "production"
    ? "[name]_[hash:base62:6]"
    : "[local]--[hash:base62:6]";

exports.loadStyles = () => ({
  module: {
    rules: [
      {
        test: CSS_REGEX,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            // only enable hot in development
            // hmr: process.env.NODE_ENV === 'development',
            // if hmr does not work, this is a forceful method.
            // reloadAll: true,
            // },
          },
          { loader: "css-loader" },
        ],
      },
      {
        test: CSS_MODULE_REGEX,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: CSS_MODULE_IDENT,
              sourceMap: true,
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].chunk.css",
    }),
  ],
});

exports.loadScripts = () => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /dist/],
        use: {
          loader: "babel-loader",
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
    }),
  ],
});

exports.loadableStats = () => ({
  plugins: [new LoadablePlugin()],
});
