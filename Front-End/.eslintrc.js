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
    "react/jsx-fragments": ['error', 'element'],
    'react/jsx-props-no-spreading': ['error', {
      custom: 'ignore',
    }],
    'jsx-a11y/label-has-associated-control': ['error', {
      'depth': 2,
    }],
    'linebreak-style': 'off',
    'object-curly-newline': ['error', {
      multiline: true,
      minProperties: 4,
      consistent: true,
    }],
  },
};
