// var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  "entry": "./js/app.js",
  "output": {
    "filename": "bundle.js"
  },
  // "plugins": [
  //   new ExtractTextPlugin("stylesheet.css"),
  //   new ExtractTextPlugin("materialize.min.css"),
  //   new ExtractTextPlugin("starter-template.css")
  // ],
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
      // {
      //   "test": /\.css$/,
      //   "exclude": /node_modules/,
      //   "loader": ExtractTextPlugin.extract("style-loader", "css-loader")
      // }
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
  }
  // ,
  // "resolve": {
  //   "extensions": ["", ".js", ".es6"]
  // }
}