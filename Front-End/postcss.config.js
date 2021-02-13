const calc = require('postcss-calc');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    calc({ precision: 3 }),
    autoprefixer,
  ],
};
