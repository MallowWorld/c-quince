require("./c-quince.js");

/**
 * Initialize the default sprite instance.
 *
 * @param canvas The HTML5 canvas elementID, defaults to "demoCanvas"
 * @param avatar The character to use, defaults to cquince
 * @param win The window object
 */
function init(canvas, avatar, win) {
  win = win || window;
  win.sprite = new cquince.Sprite(canvas || "demo-canvas", avatar || "cquince");
  jQuery.extend(win, {
    setSpeed: setSpeed,
    moveUp: moveUp,
    moveRight: moveRight,
    moveDown: moveDown,
    moveLeft: moveLeft,
    spin: spin,
    play: play,
    reset: reset,
    stop: stop,
    execute: execute
  });
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
 * Perform the "move up" animation.
 *
 * @returns {*|cquince.Sprite} The sprite object
 */
function moveUp() {
  return sprite.moveUp();
}

/**
 * Perform the "move right" animation.
 *
 * @returns {*|cquince.Sprite} The sprite object
 */
function moveRight() {
  return sprite.moveRight();
}

/**
 * Perform the "move down" animation.
 *
 * @returns {*|cquince.Sprite} The sprite object
 */
function moveDown() {
  return sprite.moveDown();
}

/**
 * Perform the "move left" animation.
 *
 * @returns {*|cquince.Sprite} The sprite object
 */
function moveLeft() {
  return sprite.moveLeft();
}

/**
 * Perform the "spin" animation.
 *
 * @returns {*|cquince.Sprite} The sprite object
 */
function spin() {
  return sprite.spin();
}

/**
 * Play a sequence of animations from the internal play buffer.
 *
 * @returns {*|cquince.Sprite} The sprite object
 */
function play() {
  return sprite.play();
}

/**
 * Reset this sprite at the next opportunity by clearing the play buffer
 * and placing it in its starting position.
 *
 * @returns {*|cquince.Sprite} The sprite object
 */
function reset() {
  return sprite.reset();
}

/**
 * Stop this sprite at the next opportunity by clearing the play buffer.
 *
 * @returns {*|cquince.Sprite} The sprite object
 */
function stop() {
  return sprite.stop();
}

/**
 * Execute the code block for the given textarea as a script.
 *
 * @param textarea* The textarea <code>elementID</code>, defaults to "workspace"
 * @returns {*|cquince.Sprite} The sprite object
 */
function execute(textarea) {
  eval(document.getElementById(textarea || "workspace").value);
  return sprite.play();
}

module.exports = init;