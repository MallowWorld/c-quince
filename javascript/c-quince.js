cquince = {};

(function() {
    cquince.Sprite = function(canvas) {
        var spriteSheet = new createjs.SpriteSheet({
            images: ["images/sprite_sheet.png"],
            frames: {
                width: 100, height: 175, count: 4, spacing: 50
            },
            animations: {
                front: 0, right: 1, back: 2, left: 3, spin: [0, 1, 2, 3]
            },
            framerate: 2
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
    };

    cquince.Sprite.prototype = {
        move: function(x, y) {
            var that = this;
            var sprite = this.sprite;
            var queue = this.queue;

            var f = function() {
                var newX = sprite.x + x;
                var newY = sprite.y + y;
                console.log("move: " + x + ", " + y + " => " + newX + ", " + newY);
                if (checkBound(newX) && checkBound(newY)) {
                    createjs.Tween.get(sprite)
                        .wait(50)
                        .to({x: newX, y: newY}, 500)
                        .call(dispatch, [that]);
                }
            };

            // queue animation
            queue.push(f);
            if (queue.length == 1) {
                console.log("hotshot m");
                dispatch(this);
            }
        },
        animate: function(animation) {
            var sprite = this.sprite;
            var queue = this.queue;

            // queue animation
            queue.push(function() {
                console.log("animate: " + animation);
                sprite.gotoAndPlay(animation);
            });
        },
        moveRight: function() {
            this.turnRight();
            this.move(100, 0);
        },
        moveDown: function() {
            this.turnForward();
            this.move(0, 100);
        },
        moveLeft: function() {
            this.turnLeft();
            this.move(-100, 0);
        },
        moveUp: function() {
            this.turnBackward();
            this.move(0, -100);
        },
        spin: function() {
            this.animate("spin");
        },
        stop: function() {
            this.animate("front");
        },
        turnForward: function() {
            this.animate("front");
        },
        turnRight: function() {
            this.animate("right");
        },
        turnBackward: function() {
            this.animate("back");
        },
        turnLeft: function() {
            this.animate("left");
        },
        execute: function(textarea) {
            var code = document.getElementById(textarea).value;
            eval(code);
            //var code = document.getElementById(textarea).value.split(";");
            //for (var i = 0; i < code.length - 1; i++) {
            //    var f = code[i].trim();
            //    f = f.substring(0, f.length - 2);
            //    this[f]();
            //}

            //var head = document.getElementsByTagName("head")[0];
            //var script = document.createElement("script");
            //script.type = "text/javascript";
            //script.innerHTML = document.getElementById(textarea).value;
            //head.appendChild(script);
        }
    };

    function dispatch(sprite) {
        var queue = sprite.queue;
        if (queue.length > 0) {
            console.log("dispatch");
            var f = queue.pop();
            f();
        }
    }

    function checkBound(coord) {
        return (coord <= 700 && coord >= 0);
    }
})();

function init() {
    window.sprite = new cquince.Sprite("demoCanvas");
}
