//Webpack config should contain at least 3 scripts, express server, build and test.
//Additionally, dev server may be included.

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/client/index.js",
  mode: "development",
  module: {
    rules: [],
  },
  devServer: {
    
  },
  plugins: [

  ],
};
