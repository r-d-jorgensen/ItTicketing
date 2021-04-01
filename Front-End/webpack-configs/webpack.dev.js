const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  devServer: {
    port: 8080,

    compress: true,
    // Necessary for an SPA
    historyApiFallback: true,
    // Only hot reload without page refresh
    hot: 'only',

    proxy: {
      '/api': 'http://localhost:8081',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
});
