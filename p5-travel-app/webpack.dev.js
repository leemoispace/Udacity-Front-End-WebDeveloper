//Webpack config should contain at least 3 scripts, express server, build and test.
//Additionally, dev server may be included.

const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/client/index.js",
  mode: "development",
  devtool: "source-map",
  stats: "verbose",
  output: {
    libraryTarget: "var",
    library: "Client",
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    host: "localhost", // Defaults to `localhost`
    port: 3000, // Defaults to 8080
    proxy: {
      "^/api/*": {
        target: "http://localhost:8081/api/",
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        loader: "babel-loader",
      },
      {
        test: /\.(scss|less|css)$/,
        use: ["style-loader", "css-loader"],
        // https://getbootstrap.com/docs/4.0/getting-started/webpack/
      },
      {
        test: /\.(jpg|png|svg|jpg|gif|webp)$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/**/*")],
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new Dotenv(),
  ],
};
