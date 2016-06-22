"use strict";

console.log("Loading canvas...");

var Sprite = require("./Sprite.js");
var sprite;

/**
 * Initialize the default sprite instance.
 */
function init() {
  sprite = new Sprite("demo-canvas", "cquince");
}

/**
 * Initialize c-quince.
 */
function initCquince() {
  sprite = new Sprite("demo-canvas", "cquince");
}


/**
 * Initialize Bug.
 */
function initBug() {
  sprite = new Sprite("demo-canvas", "bug");
}

/**
 * Set the speed, in seconds, that each movement animation takes to complete.
 *
 * @param speed The speed of movement animations, in seconds
 */
function setSpeed(speed) {
  sprite.speed = speed * 1000;
}

/**
 * Set the speed, in seconds, that each movement animation takes to complete.
 *
 * @param e The slider element
 */
function setSpeedOnChange(e) {
  setSpeed(e.get());
}

/**
 * Perform the "move up" animation.
 *
 * @returns {*|Sprite} The sprite object
 */
function moveUp() {
  return sprite.moveUp();
}

/**
 * Perform the "move right" animation.
 *
 * @returns {*|Sprite} The sprite object
 */
function moveRight() {
  return sprite.moveRight();
}

/**
 * Perform the "move down" animation.
 *
 * @returns {*|Sprite} The sprite object
 */
function moveDown() {
  return sprite.moveDown();
}

/**
 * Perform the "move left" animation.
 *
 * @returns {*|Sprite} The sprite object
 */
function moveLeft() {
  return sprite.moveLeft();
}

/**
 * Perform the "move up" animation.
 *
 * @returns {*|Sprite} The sprite object
 */
function moveUpNow() {
  return moveUp().play();
}

/**
 * Perform the "move right" animation.
 *
 * @returns {*|Sprite} The sprite object
 */
function moveRightNow() {
  return moveRight().play();
}

/**
 * Perform the "move down" animation.
 *
 * @returns {*|Sprite} The sprite object
 */
function moveDownNow() {
  return moveDown().play();
}

/**
 * Perform the "move left" animation.
 *
 * @returns {*|Sprite} The sprite object
 */
function moveLeftNow() {
  return moveLeft().play();
}

/**
 * Perform the "spin" animation.
 *
 * @returns {*|Sprite} The sprite object
 */
function spin() {
  return sprite.spin();
}

/**
 * Play a sequence of animations from the internal play buffer.
 *
 * @returns {*|Sprite} The sprite object
 */
function play() {
  return sprite.play();
}

/**
 * Reset this sprite at the next opportunity by clearing the play buffer
 * and placing it in its starting position.
 *
 * @returns {*|Sprite} The sprite object
 */
function reset() {
  return sprite.reset();
}

/**
 * Stop this sprite at the next opportunity by clearing the play buffer.
 *
 * @returns {*|Sprite} The sprite object
 */
function stop() {
  return sprite.stop();
}

/**
 * Execute the code block for the given textarea as a script.
 *
 * @returns {*|Sprite} The sprite object
 */
function execute() {
  eval(document.getElementById("workspace").value);
  return sprite.play();
}

// collect canvas functions
var canvas = {
  init: init,
  initCquince: initCquince,
  initBug: initBug,
  setSpeed: setSpeed,
  setSpeedOnChange: setSpeedOnChange,
  moveUp: moveUp,
  moveRight: moveRight,
  moveDown: moveDown,
  moveLeft: moveLeft,
  moveUpNow: moveUpNow,
  moveRightNow: moveRightNow,
  moveDownNow: moveDownNow,
  moveLeftNow: moveLeftNow,
  spin: spin,
  play: play,
  reset: reset,
  stop: stop,
  execute: execute
};

// export module
module.exports = canvas;

console.log("canvas loaded");
