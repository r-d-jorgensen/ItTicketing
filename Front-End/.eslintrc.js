module.exports = {
  root: true,
  settings: {
    'import/extensions': [
      '.js',
      '.jsx',
    ],
    'import/resolver': {
      webpack: {
        config: 'webpack-configs/webpack.base.js',
      },
    },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb/whitespace',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
  },
};
