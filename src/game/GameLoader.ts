import Game from './Game'

export default class GameLoader extends PIXI.loaders.Loader {

    public game: Game

    public slideBarTexture: PIXI.Texture
    public ballTexture: PIXI.Texture

    constructor(game: Game) {
        super();
        this.game = game;
    }  

    public loadAssets(): void {

        this.add('slidebar', '../assets/blank.png');
        this.add('ballsheet', '../assets/ballsheet.json');
        this.onProgress.add(() => {console.log("1 asset loaded")})
        this.once('complete',this.onAssetsLoaded);

        this.load();
        
    }

    public onAssetsLoaded = (loader:PIXI.loaders.Loader, resources: PIXI.loaders.Resource):void => {
        
        // Create textures
        this.ballTexture = (resources as any)["ballsheet"].textures["ball1.png"]
        this.slideBarTexture = (resources as any)["slidebar"].texture
        
        this.game.init();
    }


}