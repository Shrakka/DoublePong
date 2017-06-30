define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Manager = (function () {
        function Manager(game) {
            this.game = game;
            this._size = window.innerHeight > window.innerWidth ? innerWidth : innerHeight;
            this.setWindowProperties();
            this.setControl();
        }
        Manager.prototype.setWindowProperties = function () {
            var _this = this;
            window.addEventListener('resize', function () { _this.resizeGame(); });
        };
        Manager.prototype.setControl = function () {
            var _this = this;
            document.addEventListener('keydown', function (key) { _this.keydown(key.keyCode); });
            document.addEventListener('keyup', function (key) { _this.keyup(key.keyCode); });
        };
        Manager.prototype.resizeGame = function () {
            var lastSize = this._size;
            var size = this.getSize();
            // Do not resize the stage or bullshit happens
            //this.game.stage.height = size;
            //this.game.stage.width = size;
            // Resize the bar directly, maybe add a specific container for them in the future for easy resizing 
            this.game.bottomSlideBar.scale.set(this.getSize() / 1000, this.getSize() / 1000);
            this.game.rightSlideBar.scale.set(this.getSize() / 1000, this.getSize() / 1000);
            this.game.upSlideBar.scale.set(this.getSize() / 1000, this.getSize() / 1000);
            this.game.leftSlideBar.scale.set(this.getSize() / 1000, this.getSize() / 1000);
            // Place the element properly
            this.game.bottomSlideBar.position.y = 0.9 * size;
            this.game.rightSlideBar.position.x = 0.9 * size;
            this.game.upSlideBar.position.y = 0.1 * size;
            this.game.leftSlideBar.position.x = 0.1 * size;
            this.game.bottomSlideBar.position.x = this.game.bottomSlideBar.position.x * size / lastSize;
            this.game.rightSlideBar.position.y = this.game.rightSlideBar.position.y * size / lastSize;
            this.game.upSlideBar.position.x = this.game.bottomSlideBar.position.x * size / lastSize;
            this.game.leftSlideBar.position.y = this.game.rightSlideBar.position.y * size / lastSize;
            // Resize ball
            //this.game.ball.position.set(this.game.ball.position.x * size / lastSize, this.game.ball.position.y * size / lastSize)
            this.game.renderer.resize(size, size);
            this.game.renderer.render(this.game.stage);
        };
        Manager.prototype.getSize = function () {
            this._size = window.innerHeight > window.innerWidth ? innerWidth : innerHeight;
            return this._size;
        };
        Manager.getSizeStatic = function () {
            return window.innerHeight > window.innerWidth ? innerWidth : innerHeight;
        };
        Manager.prototype.keydown = function (keyCode) {
            switch (keyCode) {
                case 37:
                    this.startMoveLeft();
                    break;
                case 38:
                    this.startMoveUp();
                    break;
                case 39:
                    this.startMoveRight();
                    break;
                case 40:
                    this.startMoveDown();
                    break;
            }
        };
        Manager.prototype.keyup = function (keyCode) {
            switch (keyCode) {
                case 37:
                    this.stopMoveLeft();
                    break;
                case 38:
                    this.stopMoveUp();
                    break;
                case 39:
                    this.stopMoveRight();
                    break;
                case 40:
                    this.stopMoveDown();
                    break;
            }
        };
        Manager.prototype.startMoveLeft = function () {
            this.game.bottomSlideBar.left = true;
        };
        Manager.prototype.stopMoveLeft = function () {
            this.game.bottomSlideBar.left = false;
        };
        Manager.prototype.startMoveRight = function () {
            this.game.bottomSlideBar.right = true;
        };
        Manager.prototype.stopMoveRight = function () {
            this.game.bottomSlideBar.right = false;
        };
        Manager.prototype.startMoveUp = function () {
            this.game.rightSlideBar.up = true;
        };
        Manager.prototype.stopMoveUp = function () {
            this.game.rightSlideBar.up = false;
        };
        Manager.prototype.startMoveDown = function () {
            this.game.rightSlideBar.down = true;
        };
        Manager.prototype.stopMoveDown = function () {
            this.game.rightSlideBar.down = false;
        };
        return Manager;
    }());
    exports.default = Manager;
});
