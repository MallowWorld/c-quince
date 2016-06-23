var canvas = require("./canvas.js");
var $ = jQuery = require("jquery");
// var Materialize = require("materialize-css");
var Behaviors = require("behaviors");
// var Blockly = require("./Blockly");

// export canvas functions to global namespace
$.extend(window, canvas);
// window.$ = jQuery;
// window.Materialize = Materialize;
window.Behaviors = Behaviors;
// window.Blockly = Blockly;