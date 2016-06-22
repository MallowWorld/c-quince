// var $ = require("jquery");
var canvas = require("./canvas.js");
require("behaviors");

// export canvas functions to global namespace
$.extend(window, canvas);
