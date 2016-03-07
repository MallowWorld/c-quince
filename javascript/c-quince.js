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
        this.speed = 1000;
    };

    cquince.Sprite.prototype = {
        animate: function(animation) {
            queue(function() {
                console.log("animate " + animation);
                this.sprite.gotoAndPlay(animation);
                this.sprite.dispatchEvent("play");
            }, this, []);
            return this;
        },
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
        play: function() {
            this.sprite.dispatchEvent("play");
            return this;
        },
        reset: function() {
            if (this.queue.length > 0) {
                this.queue = [];
                queue(function () {
                    this.speed = 1000;
                    this.sprite.x = 100;
                    this.sprite.y = 100;
                    this.sprite.gotoAndStop("front");
                }, this, []);
            } else {
                this.speed = 1000;
                this.sprite.x = 100;
                this.sprite.y = 100;
                this.sprite.gotoAndStop("front");
            }
            return this;
        },
        stop: function() {
            this.queue = [];
            return this;
        },
        spin: function() {
            return this.animate("spin");
        },
        peck: function() {
            return this.animate("peck");
        },
        bow: function() {
            return this.animate("bow");
        },
        moveUp: function() {
            return this.animate("back").move(0, -100);
        },
        moveRight: function() {
            return this.animate("right").move(100, 0);
        },
        moveDown: function() {
            return this.animate("front").move(0, 100);
        },
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
            var f = this.queue.shift();
            f.call(this, []);
        }
    }
})();

function $(id) {
    return document.getElementById(id);
}

function init() {
    window.sprite = new cquince.Sprite("demoCanvas");
}

function setSpeed(speed) {
    sprite.speed = speed * 1000;
}

function moveUp() {
    return sprite.moveUp();
}

function moveRight() {
    return sprite.moveRight();
}

function moveDown() {
    return sprite.moveDown();
}

function moveLeft() {
    return sprite.moveLeft();
}

function spin() {
    return sprite.spin();
}

function peck() {
    return sprite.peck();
}

function bow() {
    return sprite.bow();
}

function play() {
    return sprite.play();
}

function reset() {
    return sprite.reset();
}

function stop() {
    return sprite.stop();
}

function execute() {
    eval($("workspace").value);
    return sprite.play();
}