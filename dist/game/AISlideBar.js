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
define(["require", "exports", "./SlideBar"], function (require, exports, SlideBar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AISlideBar = (function (_super) {
        __extends(AISlideBar, _super);
        function AISlideBar(x, y, horizontal, human, texture, ball) {
            var _this = _super.call(this, x, y, horizontal, human, texture) || this;
            _this.ball = ball;
            return _this;
        }
        AISlideBar.prototype.move = function () {
            if (this.horizontal) {
                if (this.ball.x > this.position.x) {
                    this.position.x += 1;
                }
                if (this.ball.x < this.position.x) {
                    this.position.x -= 1;
                }
            }
            else {
                if (this.ball.y > this.position.y) {
                    this.position.y += 1;
                }
                if (this.ball.y < this.position.y) {
                    this.position.y -= 1;
                }
            }
        };
        return AISlideBar;
    }(SlideBar_1.default));
    exports.default = AISlideBar;
});
