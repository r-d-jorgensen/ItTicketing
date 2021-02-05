<div align="center">
  <h1>IT Ticketing</h1>
</div>

<h2>Development Setup</h2>

#### .env Example

```
process.env.NODE_ENV=development
```

#### Main Scripts
``` bash

# This command will run `webpack serve --config ./webpack-configs/webpack.dev.js`
# Webpack will start a local server that will host the application using
# the specified config file for development
yarn start
```

*Note*: All build scripts will run ESLint to mitigate syntactical errors and ensure consistent code across the application source code. The ESLint config is `.eslintrc.js` if modifications are necessary.