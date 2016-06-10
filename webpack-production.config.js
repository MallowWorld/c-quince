var $ = require("jQuery");
var strip = require("strip-loader");
var config = require("./webpack.config.js");

config.module.loaders.push({
  "test": [/\.js$/, /\.es6$/],
  "exclude": /node_modules/,
  "loader": strip.loader("console.log")
});

config.module.preLoaders = [];

module.exports = config;