// eslint-disable-next-line import/order
const baseConfig = require('./webpack.base.js');

const webpack = require('webpack');
const { merge } = require('webpack-merge');

const ENABLE_REFRESH = process.env.ENABLE_REFRESH === 'true';

module.exports = merge(baseConfig, {
  devServer: {
    port: 8080,

    compress: true,
    // Necessary for an SPA
    historyApiFallback: true,
    // Only hot reload without page refresh
    hot: ENABLE_REFRESH ? 'only' : false,

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
              plugins: ENABLE_REFRESH ? ['react-refresh/babel'] : [],
            },
          },
        ],
      },
    ],
  },
  plugins: ENABLE_REFRESH ? [
    new webpack.HotModuleReplacementPlugin(),
    // eslint-disable-next-line global-require
    new (require('@pmmmwh/react-refresh-webpack-plugin'))(),
  ] : [],
});
