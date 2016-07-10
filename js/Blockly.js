"use strict";

var Blockly = require("node-blockly");

Blockly.Blocks["controls_move"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("move")
        .appendField(new Blockly.FieldDropdown([["up", "up"], ["right", "right"], ["down", "down"], ["left", "left"]]), "DIRECTION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip("Move c-quince in a direction (UP or DOWN, LEFT or RIGHT");
  }
};

Blockly.JavaScript["controls_move"] = function(block) {
  var dropdown_direction = block.getFieldValue("DIRECTION");

  // Assemble JavaScript into code variable.
  var code;
  switch (dropdown_direction) {
    case "left":
        code = "moveLeft()";
      break;
    case "right":
        code = "moveRight()";
      break;
    case "up":
        code = "moveUp()";
      break;
    case "down":
        code = "moveDown()";
      break;
    default:
      throw new Error("Unknown direction: " + dropdown_direction);
  }

  return code + ";\n";
};

Blockly.Blocks["controls_spin"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("spin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
    this.setTooltip("");
  }
};

Blockly.JavaScript["controls_spin"] = function(block) {
  return "spin();\n";
};

Blockly.Blocks["controls_repeat_times"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("repeat")
        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"]]), "TIMES")
        .appendField("times");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip("");
  }
};

var FOR_LOOP_TEMPLATE =
    "for (var counter{{id}} = 0; counter{{id}} < {{times}}; counter{{id}}++) {\n" +
    "  {{statements}}" +
    "}\n";

var counterId = 0;
Blockly.JavaScript["controls_repeat_times"] = function(block) {
  var dropdown_times = block.getFieldValue("TIMES");
  var statements_do = Blockly.JavaScript.statementToCode(block, "DO");

  // Assemble JavaScript into code variable.
  var id = (++counterId > 1) ? ("" + counterId) : "";
  return FOR_LOOP_TEMPLATE
      .replace(new RegExp("{{id}}", "g"), id)
      .replace("{{times}}", dropdown_times)
      .replace("{{statements}}", statements_do);
};

module.exports = Blockly;
