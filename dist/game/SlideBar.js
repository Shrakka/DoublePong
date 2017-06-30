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
    var SlideBar = (function (_super) {
        __extends(SlideBar, _super);
        function SlideBar(x, y, horizontal, human, texture) {
            var _this = _super.call(this, texture) || this;
            _this.position.set(x, y);
            _this.horizontal = horizontal === 'horizontal' ? true : false;
            _this.human = human === 'human' ? true : false;
            _this.setSlideBar();
            return _this;
        }
        SlideBar.prototype.move = function () {
            if (this.horizontal) {
                if (this.left) {
                    this.x -= 5;
                }
                if (this.right) {
                    this.x += 5;
                }
                if (this.up) {
                    this.y -= 5;
                }
                if (this.down) {
                    this.y += 5;
                }
            }
            else {
                if (this.up) {
                    this.y -= 5;
                }
                if (this.down) {
                    this.y += 5;
                }
            }
        };
        SlideBar.prototype.setSlideBar = function () {
            this._anchor.set(0.5, 0.5);
            this.left = false;
            this.right = false;
            this.up = false;
            this.down = false;
            if (!this.horizontal) {
                this.rotation = Math.PI / 2;
            }
        };
        return SlideBar;
    }(PIXI.Sprite));
    exports.default = SlideBar;
});
