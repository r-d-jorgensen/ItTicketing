// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const dotenv = require('dotenv');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';

// dotenv loads environment variables from .env.local
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
  // Tells webpack to use certain settings depending on the mode
  // https://webpack.js.org/configuration/mode/
  mode: PRODUCTION ? 'production' : 'development',
  // Initial entry point of the application
  entry: {
    app: './src/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/', // public url of output assets
  },
  // `resolve` deals with module resolution
  resolve: {
    // `alias` provides shortcut functionality
    // This allows one to reference common source folders easily
    // Regardless of where a file is in the folder structure
    // one can for example write:
    // import ComponentA from 'components/ComponentA'
    alias: {
      src: path.resolve(__dirname, '../src'),
      views: path.resolve(__dirname, '../src/views'),
      components: path.resolve(__dirname, '../src/components'),
    },
    // In the case of multiple files with the same name but different extensions or
    // in the case of imports with no extension this is the order webpack will attempt
    // to load the specified module
    extensions: ['.jsx', '.js'],
  },
  // Externals excludes this module from the final bundle.
  externals: {
  //  'prop-types': 'prop-types',
  },
  // The meat of webpack and where various asset types are told how to be handled.
  // A rule is composed of conditions that specify matching modules and one or more
  // loaders. These loaders let webpack process a variety of modules.
  // https://webpack.js.org/configuration/module/#rule
  // https://webpack.js.org/loaders/
  module: {
    rules: [
      {
        // Babel loader handles all javascript transpilation
        // Currently babel configuration can be found in package.json
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        // An example of using more than one loader
        // These loaders are applied in reverse order so `PostCSSLoader` will be the
        // first loader applied then `css-loader` followed by `style-loader`
        // ---
        // `style-loader` handles injecting the style into the web page
        // `css-loader` handles the actual css
        // `PostCSSLoader` applies PostCSS plugins
        // PostCSS configuration can be found in postcss.config.js
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
    // ESLint performs static analysis to mark possible errors based
    // on certain rules defined in .eslintrc.js
    new ESLintWebpackPlugin({
      extensions: ['js', 'jsx'],
      eslintPath: require.resolve('eslint'),
      context: './src',
      cache: true,
      failOnError: false,
      resolvePluginsRelativeTo: __dirname,
    }),
    // Sets global constant at *compile* time
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    // https://webpack.js.org/plugins/html-webpack-plugin/
    // This plugin accepts lodash templates - in our case `index.ejs`
    // and will inject all our necessary scripts
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
