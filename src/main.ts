import Game from "./game/Game";
import Manager from "./game/Manager"

const game = new Game("SuperPong");
const manager = new Manager(game);

document.body.appendChild(game.renderer.view);
