var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Ball = (function (_super) {
        __extends(Ball, _super);
        function Ball(texture) {
            var _this = _super.call(this, texture) || this;
            _this.setBall();
            return _this;
        }
        Ball.prototype.move = function () {
            this.position.set(this.position.x + this.speed * Math.cos(this.direction), this.position.y - this.speed * Math.sin(this.direction));
        };
        Ball.prototype.setBall = function () {
            this.anchor.set(0.5, 0.5);
            this.position.y = 400;
            this.position.x = 400;
            this.speed = 3;
            this.direction = 3 * Math.PI / 2;
        };
        Ball.prototype.getCorners = function () {
            var res = [];
            res.push(new PIXI.Point(this.position.x - this.width / 2, this.position.y - this.height / 2));
            res.push(new PIXI.Point(this.position.x + this.width / 2, this.position.y - this.height / 2));
            res.push(new PIXI.Point(this.position.x + this.width / 2, this.position.y + this.height / 2));
            res.push(new PIXI.Point(this.position.x - this.width / 2, this.position.y + this.height / 2));
            return res;
        };
        return Ball;
    }(PIXI.Sprite));
    exports.default = Ball;
});
/*
PIXI.loader.add("../assets/ballsheet.json").load(onAssetsLoaded);

var anim: any;

function onAssetsLoaded() {
    var frames = []
    frames.push(PIXI.Texture.fromFrame('ball0.png'));
    frames.push(PIXI.Texture.fromFrame('ball1.png'));
    frames.push(PIXI.Texture.fromFrame('ball2.png'));
    frames.push(PIXI.Texture.fromFrame('ball3.png'));

    anim = new PIXI.extras.AnimatedSprite(frames);
    anim.anchor.set(0.5,0.5);
    anim.position.set(200,200);
    anim.animationSpeed = 0.5;
    anim.play();
}

export default anim;
*/ 
