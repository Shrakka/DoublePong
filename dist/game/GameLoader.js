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
    var GameLoader = (function (_super) {
        __extends(GameLoader, _super);
        function GameLoader(game) {
            var _this = _super.call(this) || this;
            _this.onAssetsLoaded = function (loader, resources) {
                // Create textures
                _this.ballTexture = resources["ballsheet"].textures["ball1.png"];
                _this.slideBarTexture = resources["slidebar"].texture;
                _this.game.init();
            };
            _this.game = game;
            return _this;
        }
        GameLoader.prototype.loadAssets = function () {
            this.add('slidebar', '../assets/blank.png');
            this.add('ballsheet', '../assets/ballsheet.json');
            this.onProgress.add(function () { console.log("1 asset loaded"); });
            this.once('complete', this.onAssetsLoaded);
            this.load();
        };
        return GameLoader;
    }(PIXI.loaders.Loader));
    exports.default = GameLoader;
});
