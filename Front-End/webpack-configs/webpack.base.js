// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const dotenv = require('dotenv');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';

dotenv.config({ path: '.env.local' });

const PostCSSLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    postcssOptions: {
      config: './postcss.config.js',
    },
  },
};

const base = {
  mode: PRODUCTION ? 'production' : 'development',
  entry: {
    app: './src/entry.jsx',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
      views: path.resolve(__dirname, '../src/views'),
      components: path.resolve(__dirname, '../src/components'),
    },
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          PostCSSLoader,
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HTMLWebpackPlugin({
      template: './src/index.ejs',
      title: 'IT Ticketing',
      inject: true,
      scriptLoading: 'defer',
      minify: PRODUCTION ? {
        removeComments: true,
        collapseWhitespace: true,
        sortAttributes: true,
        sortClassName: true,
        removeRedundantAttributes: true,
      } : false,
    }),
  ],
};

module.exports = base;
