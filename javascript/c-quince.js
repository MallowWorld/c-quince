cquince = {};

(function() {
    cquince.Sprite = function(canvas) {
        this.spriteSheet = new createjs.SpriteSheet({
            images: ["images/sprite_sheet.png"],
            frames: {
                width: 100, height: 175, count: 4, spacing: 50
            },
            animations: {
                front: 0, right: 1, back: 2, left: 3, spin: [0, 1, 2, 3]
            },
            framerate: 2
        });
        this.sprite = new createjs.Sprite(this.spriteSheet, "front");
        this.sprite.x = 100;
        this.sprite.y = 100;

        this.stage = new createjs.Stage(canvas);
        this.stage.addChild(this.sprite);

        createjs.Ticker.setFPS(120);
        createjs.Ticker.addEventListener("tick", this.stage);
    };

    cquince.Sprite.prototype = {
        move: function(x, y) {
            var newX = this.sprite.x + x;
            var newY = this.sprite.y + y;
            if (checkBound(newX) && checkBound(newY)) {
                createjs.Tween.get(this.sprite)
                    .wait(50)
                    .to({ x: newX, y: newY }, 500);
            }
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
            this.sprite.gotoAndPlay("spin");
        },
        stop: function() {
            this.sprite.gotoAndStop("front");
        },
        turnForward: function() {
            this.sprite.gotoAndStop("front");
        },
        turnRight: function() {
            this.sprite.gotoAndStop("right");
        },
        turnBackward: function() {
            this.sprite.gotoAndStop("back");
        },
        turnLeft: function() {
            this.sprite.gotoAndStop("left");
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

    function checkBound(coord) {
        return (coord <= 700 && coord >= 0);
    }
})();

function init() {
    window.sprite = new cquince.Sprite("demoCanvas");
}
