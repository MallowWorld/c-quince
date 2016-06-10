var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  "context": path.resolve("js"),
  "entry": "./canvas.js",
  "output": {
    "path": path.resolve("build/"),
    "publicPath": "/assets/",
    "filename": "bundle.js"
  },
  "plugins": [
    new ExtractTextPlugin("stylesheet.css"),
    new ExtractTextPlugin("materialize.min.css"),
    new ExtractTextPlugin("starter-template.css")
  ],
  "devServer": {
    "contentBase": ""
  },
  "module": {
    // "preLoaders": [
    //   {
    //     "test": /\.js$/,
    //     "exclude": /node_modules/,
    //     "loader": "jshint-loader"
    //   }
    // ],
    "loaders": [
      // {
      //   "test": /\.es6$/,
      //   "exclude": /node_modules/,
      //   "loader": "babel-loader"
      // },
      {
        "test": /\.css$/,
        "exclude": /node_modules/,
        "loader": ExtractTextPlugin.extract("style-loader", "css-loader")
      }
      // ,
      // {
      //   "text": /\.less$/,
      //   "exclude": /node_modules/,
      //   "loader": ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      // }
      // ,
      // {
      //   "test": /\.(png|jpg)$/,
      //   "exclude": /node_modules/,
      //   "loader": "image-loader"
      // }
    ]
  },
  "resolve": {
    "extensions": ["", ".js", ".es6"]
  }
}