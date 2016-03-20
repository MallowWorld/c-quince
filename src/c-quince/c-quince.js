cquince = {};

(function() {
    "use strict";

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
     * @constructor
     */
    cquince.Sprite = function(canvas) {
        var spriteSheet = new createjs.SpriteSheet({
            images: ["images/sprite_sheet.png"],
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

    cquince.Sprite.prototype = {
        /**
         * Perform a sprite animation by name.
         * 
         * @param animation A named animation to perform
         * @returns {cquince.Sprite} This object
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
         * @returns {cquince.Sprite} This object
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
         * @returns {cquince.Sprite} This object
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
         * @returns {cquince.Sprite} This object
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
         * @returns {cquince.Sprite} This object
         */
        stop: function() {
            this.queue = [];
            return this;
        },
        /**
         * Perform the "spin" animation.
         * 
         * @returns {*|cquince.Sprite} This object
         */
        spin: function() {
            return this.animate("spin");
        },
        /**
         * Perform the "move up" animation.
         *
         * @returns {*|cquince.Sprite} This object
         */
        moveUp: function() {
            return this.animate("back").move(0, -100);
        },
        /**
         * Perform the "move right" animation.
         *
         * @returns {*|cquince.Sprite} This object
         */
        moveRight: function() {
            return this.animate("right").move(100, 0);
        },
        /**
         * Perform the "move down" animation.
         *
         * @returns {*|cquince.Sprite} This object
         */
        moveDown: function() {
            return this.animate("front").move(0, 100);
        },
        /**
         * Perform the "move left" animation.
         *
         * @returns {*|cquince.Sprite} This object
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
})();

/**
 * Initialize the default sprite instance.
 * 
 * @param canvas* The HTML5 canvas elementID, defaults to "demoCanvas"
 */
function init(canvas) {
    window.sprite = new cquince.Sprite(canvas || "demoCanvas");
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
