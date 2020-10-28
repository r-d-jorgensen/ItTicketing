const calc = require('postcss-calc');

module.exports = {
  plugins: [
    calc({ precision: 3 }),
  ],
};
