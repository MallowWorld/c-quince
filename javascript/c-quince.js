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
        this.tween = createjs.Tween(sprite, { paused: true });
    };

    cquince.Sprite.prototype = {
        move: function(x, y, animation) {
            var newX = this.sprite.x + x;
            var newY = this.sprite.y + y;
            if (checkBound(newX) && checkBound(newY)) {
                var tween = createjs.Tween.get(this.sprite, { paused: true })
                    .call(this.animate, [animation], this)
                    .wait(50)
                    .to({ x: newX, y: newY }, 500);
                if (createjs.Tween.hasActiveTweens()) {
                    console.log("active");
                    this.tween.play(tween);
                } else {
                    this.tween = tween;
                    tween.setPaused(false);
                }
            }
        },
        animate: function(animation) {
            this.sprite.gotoAndPlay(animation);
        },
        moveRight: function() {
            this.move(100, 0, "right");
        },
        moveDown: function() {
            this.move(0, 100, "front");
        },
        moveLeft: function() {
            this.move(-100, 0, "left");
        },
        moveUp: function() {
            this.move(0, -100, "back");
        },
        spin: function() {
            this.sprite.gotoAndPlay("spin");
        },
        stop: function() {
            this.sprite.gotoAndStop("front");
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
