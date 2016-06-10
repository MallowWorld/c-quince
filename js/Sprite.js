"use strict";

console.log("Loading Sprite...");

var createjs = require("createjs-collection");

/**
 * Construct a c-quince sprite object used to control movement of a sprite
 * on an HTML5 &lt;canvas&gt;.
 * 
 * This class uses the CreateJS library, specifically TweenJS and EaselJS
 * to animate the sprite. Because this library operates asynchronously, an
 * internal queue of animation functions is maintained to script the actions
 * the sprite takes. All API methods simply add to the internal queue, and
 * the <code>play</code> method is used to execute them.
 * 
 * @param canvas The HTML5 canvas elementID
 * @param avatar The character to use, defaults to cquince [cquince, bug]
 * @constructor
 */
function Sprite(canvas, avatar) {
  var spriteSheet = new createjs.SpriteSheet({
    images: ["images/sprite_sheet_" + avatar + ".png"],
    frames: {
      width: 105.5, height: 121, regX: -15.5, regY: 21, spacing: 15.5
    },
    animations: {
      front: 0, right: 1, back: 2, left: 3,
      spin: {
        frames: [0, 1, 2, 3],
        speed: 1
      }
    },
    framerate: 4
  });
  var sprite = new createjs.Sprite(spriteSheet, "front");
  sprite.x = 100;
  sprite.y = 100;

  var stage = new createjs.Stage(canvas);
  stage.addChild(sprite);

  createjs.Ticker.setFPS(120);
  createjs.Ticker.addEventListener("tick", stage);

  this.spriteSheet = spriteSheet;
  this.sprite = sprite;
  this.stage = stage;
  this.queue = [];
  this.speed = 1000;
  this.playing = false;

  // register keyup event
  document.addEventListener("keydown", onKeyDown.bind(this), true);
};

Sprite.prototype = {
  /**
   * Perform a sprite animation by name.
   * 
   * @param animation A named animation to perform
   * @returns {Sprite} This object
   */
  animate: function(animation) {
    queue(function() {
      console.log("animate " + animation);
      this.sprite.gotoAndPlay(animation);
      playNext.call(this);
    }, this, []);
    return this;
  },
  /**
   * Move the specified number of pixels along the x and y axis.
   * 
   * @param x The number of horizontal pixels to move
   * @param y The number of vertical pixels to move
   * @returns {Sprite} This object
   */
  move: function(x, y) {
    queue(function() {
      console.log("move " + x + "," + y);
      createjs.Tween.get(this.sprite)
        .wait(this.speed / 4)
        .to({
          x: this.sprite.x + x,
          y: this.sprite.y + y
        }, this.speed / 2)
        .wait(this.speed / 4)
        .call(playNext, [], this);
    }, this);
    return this;
  },
  /**
   * Play a sequence of animations from the internal play buffer.
   * 
   * @returns {Sprite} This object
   */
  play: function() {
    if (!this.playing) {
      playNext.call(this);
    }
    return this;
  },
  /**
   * Reset this sprite at the next opportunity by clearing the play buffer
   * and placing it in its starting position.
   * 
   * @returns {Sprite} This object
   */
  reset: function() {
    if (this.queue.length > 0) {
      this.queue = [];
      queue(function () {
        this.speed = 1000;
        this.sprite.x = 100;
        this.sprite.y = 100;
        this.playing = false;
        this.sprite.gotoAndStop("front");
      }, this, []);
    } else {
      this.speed = 1000;
      this.sprite.x = 100;
      this.sprite.y = 100;
      this.playing = false;
      this.sprite.gotoAndStop("front");
    }
    return this;
  },
  /**
   * Stop this sprite at the next opportunity by clearing the play buffer.
   * 
   * @returns {Sprite} This object
   */
  stop: function() {
    this.queue = [];
    return this;
  },
  /**
   * Perform the "spin" animation.
   * 
   * @returns {*|Sprite} This object
   */
  spin: function() {
    return this.animate("spin");
  },
  /**
   * Perform the "move up" animation.
   *
   * @returns {*|Sprite} This object
   */
  moveUp: function() {
    return this.animate("back").move(0, -100);
  },
  /**
   * Perform the "move right" animation.
   *
   * @returns {*|Sprite} This object
   */
  moveRight: function() {
    return this.animate("right").move(100, 0);
  },
  /**
   * Perform the "move down" animation.
   *
   * @returns {*|Sprite} This object
   */
  moveDown: function() {
    return this.animate("front").move(0, 100);
  },
  /**
   * Perform the "move left" animation.
   *
   * @returns {*|Sprite} This object
   */
  moveLeft: function() {
    return this.animate("left").move(-100, 0);
  }
};

function queue(f, context, args) {
  context.queue.push(function() {
    f.call(context, args);
  });
}

function playNext() {
  if (this.queue.length > 0) {
    this.playing = true;
    var f = this.queue.shift();
    f.call(this, []);
  } else {
    this.playing = false;
  }
}

function onKeyDown(e) {
  var result = true;
  switch (e.keyCode) {
    case 37:
    case 38:
    case 39:
    case 40:
      e.preventDefault();
      result = false;
      break;
  }

  switch (e.keyCode) {
    case 37:
      this.stop().moveLeft().play();
      break;
    case 38:
      this.stop().moveUp().play();
      break;
    case 39:
      this.stop().moveRight().play();
      break;
    case 40:
      this.stop().moveDown().play();
      break;
  }

  return result;
}

// export module
module.exports = Sprite;

console.log("Sprite loaded");
