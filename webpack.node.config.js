var webpack = require("webpack");
var path = require("path");
var fs = require('fs');

var nodeModules = {};
fs.readdirSync(path.join(__dirname, "node_modules"))
  .filter(x => x != ".bin")
  .forEach(mod => nodeModules[mod] = "commonjs " + mod)

module.exports = {
  entry: [
    path.join(__dirname, "server/bin/www")
  ],
  output: {
    path: path.join(__dirname, "server/dist"),
    filename: "www"
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts" },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  resolve: {
    extensions: ["", ".ts", ".js"]
  },
  target: "node",
  externals: nodeModules,
  recordsPath: path.join(__dirname, "webpack-records")
}