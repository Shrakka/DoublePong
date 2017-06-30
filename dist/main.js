define(["require", "exports", "./game/Game", "./game/Manager"], function (require, exports, Game_1, Manager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var game = new Game_1.default("SuperPong");
    var manager = new Manager_1.default(game);
    document.body.appendChild(game.renderer.view);
});
