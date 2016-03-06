cquince = {};

(function() {
    "use strict";

    cquince.Sprite = function(canvas) {
        var spriteSheet = new createjs.SpriteSheet({
            images: ["images/sprite_sheet_3.png", "images/down_profile_right.png"],
            frames: {
                width: 175, height: 175
            },
            animations: {
                front: 0, right: 1, back: 2, left: 3,
                spin: [0, 3],
                peck: {
                    frames: [
                        4, 4, 4, 4, 5, 6,
                        7, 8, 9, 9, 8, 7,
                        7, 8, 9, 9, 8, 7,
                        7, 8, 9, 9, 8, 7,
                        6, 5, 4, 4, 4, 4
                    ],
                    speed: 4,
                    next: "right"
                },
                bow: {
                    frames: [4, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 6, 5, 4],
                    speed: 3,
                    next: "right"
                }
            },
            framerate: 8
        });
        var sprite = new createjs.Sprite(spriteSheet, "front");
        sprite.x = 100;
        sprite.y = 100;
        sprite.on("play", playNext, this);

        var stage = new createjs.Stage(canvas);
        stage.addChild(sprite);

        createjs.Ticker.setFPS(120);
        createjs.Ticker.addEventListener("tick", stage);

        this.spriteSheet = spriteSheet;
        this.sprite = sprite;
        this.stage = stage;
        this.tween = createjs.Tween(sprite, { paused: true });
        this.queue = [];
    };

    cquince.Sprite.prototype = {
        animate: function(animation) {
            queue(function() {
                console.log("animate " + animation);
                this.sprite.gotoAndPlay(animation);
                playNext.call(this);
            }, this, []);
            return this;
        },
        move: function(x, y) {
            queue(function() {
                console.log("move " + x + "," + y);
                createjs.Tween.get(this.sprite)
                    .wait(50)
                    .to({
                        x: this.sprite.x + x,
                        y: this.sprite.y + y
                    }, 500)
                    .call(playNext, [], this);
            }, this);
            return this;
        },
        spin: function() {
            this.animate("spin");
            return this;
        },
        peck: function() {
            this.animate("peck");
            return this;
        },
        bow: function() {
            this.animate("bow");
            return this;
        },
        stop: function() {
            this.animate("front");
            return this;
        },
        moveUp: function() {
            this.animate("back").move(0, -100);
            return this;
        },
        moveRight: function() {
            this.animate("right").move(100, 0);
            return this;
        },
        moveDown: function() {
            this.animate("front").move(0, 100);
            return this;
        },
        moveLeft: function() {
            this.animate("left").move(-100, 0);
            return this;
        },
        play: function() {
            this.sprite.dispatchEvent("play");
            return this;
        },
        execute: function(workspace) {
            eval($(workspace).value);
            this.play();
            return this;
        }
    };

    function $(id) {
        return document.getElementById(id);
    }

    function queue(f, context, args) {
        context.queue.push(function() {
            f.call(context, args);
        });
    }

    function playNext() {
        if (this.queue.length > 0) {
            var f = this.queue.shift();
            f.call(this, []);
        }
    }
})();

function init() {
    window.sprite = new cquince.Sprite("demoCanvas");
}

function moveUp() {
    sprite.moveUp();
}

function moveRight() {
    sprite.moveRight();
}

function moveDown() {
    sprite.moveDown();
}

function moveLeft() {
    sprite.moveLeft();
}