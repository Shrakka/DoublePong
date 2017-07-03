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
define(["require", "exports", "./SlideBar", "./AISlideBar", "./Manager", "./GameLoader", "./Ball"], function (require, exports, SlideBar_1, AISlideBar_1, Manager_1, GameLoader_1, Ball_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Game = (function (_super) {
        __extends(Game, _super);
        // Can be interesting
        //public interactionManager: PIXI.interaction.InteractionManager;
        // ------------------------------------------------------------------------------------------------------------------
        function Game(name) {
            var _this = _super.call(this) || this;
            // Setup main properties
            _this.name = name;
            _this.gameOver = false;
            _this.manager = new Manager_1.default(_this);
            _this._loader = new GameLoader_1.default(_this);
            // Start loading the assets
            _this._loader.loadAssets();
            return _this;
            //   const foo = PIXI.sound.Sound.from("../assets/ping.wav");
            //   foo.play();
            // sound.add("ping", "../assets/ping.wav")
        }
        // ------------------------------------------------------------------------------------------------------------------
        Game.prototype.init = function () {
            this.renderer.backgroundColor = 0xFF00FF;
            this.renderer.autoResize = true;
            this.bottomSlideBar = new SlideBar_1.default(40, 40, 'horizontal', 'human', this._loader.slideBarTexture);
            this.rightSlideBar = new SlideBar_1.default(200, 200, 'vertical', 'human', this._loader.slideBarTexture);
            this.ball = new Ball_1.default(this._loader.ballTexture);
            // Could be interesting
            //this.interactionManager = new PIXI.interaction.InteractionManager(this.renderer);
            //this.ball.interactive = true;
            this.upSlideBar = new AISlideBar_1.default(200, 40, 'horizontal', 'computer', this._loader.slideBarTexture, this.ball);
            this.leftSlideBar = new AISlideBar_1.default(200, 40, 'vertical', 'computer', this._loader.slideBarTexture, this.ball);
            // SOUNDS
            this.ping = new Howl({ src: ['../assets/ping.wav'] });
            this.ping.play();
            this.stage.addChild(this.bottomSlideBar);
            this.stage.addChild(this.rightSlideBar);
            this.stage.addChild(this.ball);
            this.stage.addChild(this.upSlideBar);
            this.stage.addChild(this.leftSlideBar);
            this.manager.resizeGame();
            this.gameLoop();
        };
        // ------------------------------------------------------------------------------------------------------------------
        Game.prototype.gameLoop = function () {
            var _this = this;
            // Loop the gameLoop function
            if (!this.gameOver) {
                requestAnimationFrame(function () { return _this.gameLoop(); });
            }
            else {
                this.resetGame();
            }
            // Animate 
            this.bottomSlideBar.move();
            this.rightSlideBar.move();
            this.ball.move();
            this.upSlideBar.move();
            this.leftSlideBar.move();
            // Check for collision
            if (!this.ballIsSafe()) {
                this.collide();
            }
            if (this.winner() !== 0) {
                this.gameOver = true;
            }
            // Render the stage
            this.renderer.render(this.stage);
        };
        // ------------------------------------------------------------------------------------------------------------------
        Game.prototype.collide = function () {
            var collide = false;
            // CHECKING RIGHT COLLISION
            if (this.rightSlideBar.containsPoint(this.ball.getCorners()[1]) || this.rightSlideBar.containsPoint(this.ball.getCorners()[2])) {
                this.ball.direction = this.newDirection("right");
                collide = true;
            }
            // CHECKING BOTTOM COLLISION
            if (this.bottomSlideBar.containsPoint(this.ball.getCorners()[2]) || this.bottomSlideBar.containsPoint(this.ball.getCorners()[3])) {
                this.ball.direction = this.newDirection("bottom");
                collide = true;
            }
            // CHECKING TOP COLLISION
            if (this.upSlideBar.containsPoint(this.ball.getCorners()[0]) || this.upSlideBar.containsPoint(this.ball.getCorners()[1])) {
                this.ball.direction = this.newDirection("top");
                collide = true;
            }
            // CHECKING LEFT COLLISION
            if (this.leftSlideBar.containsPoint(this.ball.getCorners()[0]) || this.leftSlideBar.containsPoint(this.ball.getCorners()[3])) {
                this.ball.direction = this.newDirection("left");
                collide = true;
            }
            return collide;
        };
        // ------------------------------------------------------------------------------------------------------------------
        Game.prototype.ballIsSafe = function () {
            if (this.ball.position.x > 100) {
                if (this.ball.position.x < this.rightSlideBar.position.x - 30) {
                    if (this.ball.position.y > 100) {
                        if (this.ball.position.y < this.bottomSlideBar.y - 30) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        // ------------------------------------------------------------------------------------------------------------------
        Game.prototype.winner = function () {
            var corners = this.ball.getCorners();
            var tl = corners[0];
            var tr = corners[1];
            var br = corners[2];
            var bl = corners[3];
            // Top collision
            if (tl.y < 0) {
                console.log("Top collision");
                return 1;
            }
            // Left collision
            if (tl.x < 0) {
                console.log("Left collision");
                return 1;
            }
            // Bottom collision
            if (br.y > this.manager.getSize()) {
                console.log("bottom collision");
                return 2;
            }
            // Right collision
            if (br.x > this.manager.getSize()) {
                console.log("right collision");
                return 2;
            }
            return 0;
        };
        // ------------------------------------------------------------------------------------------------------------------
        Game.prototype.resetGame = function () {
            this.ball.position.set(200, 350);
            this.ball.direction = 3 * Math.PI / 2;
            this.gameOver = false;
            this.gameLoop();
        };
        // ------------------------------------------------------------------------------------------------------------------
        Game.prototype.newDirection = function (slidebar) {
            var coef;
            var direction = this.ball.direction + Math.PI;
            switch (slidebar) {
                case "bottom":
                    coef = (this.ball.x - this.bottomSlideBar.x) / (this.ball.width / 2 + this.bottomSlideBar.width / 2);
                    direction = Math.PI / 2 - coef * Math.PI / 3;
                    break;
                case "right":
                    coef = (this.ball.y - this.rightSlideBar.y) / (this.ball.width / 2 + this.rightSlideBar.width / 2);
                    direction = Math.PI + coef * Math.PI / 3;
                    break;
                case "left":
                    coef = (this.ball.y - this.leftSlideBar.y) / (this.ball.width / 2 + this.leftSlideBar.width / 2);
                    direction = -coef * Math.PI / 3;
                    break;
                case "top":
                    coef = (this.ball.x - this.upSlideBar.x) / (this.ball.width / 2 + this.upSlideBar.width / 2);
                    direction = 3 * Math.PI / 2 + coef * Math.PI / 3;
                    break;
            }
            return direction;
        };
        return Game;
    }(PIXI.Application));
    exports.default = Game;
});
