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
                //this.ballTextures.push((resources as any)["trumpsheet"].textures["trump0.png"]);
                _this.ballTextures.push(resources["ballsheet"].textures["ball0.png"]);
                _this.ballTextures.push(resources["trumpface"].texture);
                _this.ennemiSlideBar = resources["ennemybar"].texture;
                _this.slideBarTexture = resources["slidebar"].texture;
                _this.background = resources["background"].texture;
                _this.game.init();
            };
            _this.game = game;
            _this.ballTextures = [];
            return _this;
        }
        GameLoader.prototype.loadAssets = function () {
            this.add('slidebar', '../assets/burgerXLB.png');
            this.add('ennemybar', '../assets/communist.png');
            //  this.add('trumpsheet', '../assets/trumpsheet.json');
            this.add('ballsheet', '../assets/ballsheet.json');
            this.add('background', '../assets/background.jpg');
            this.onProgress.add(function () { console.log("1 asset loaded"); });
            this.add('trumpface', '../assets/trumpface.png');
            this.once('complete', this.onAssetsLoaded);
            this.load();
        };
        return GameLoader;
    }(PIXI.loaders.Loader));
    exports.default = GameLoader;
});
