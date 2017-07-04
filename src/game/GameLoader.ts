import Game from './Game'

export default class GameLoader extends PIXI.loaders.Loader {

    public game: Game

    public slideBarTexture: PIXI.Texture
    public ennemiSlideBar: PIXI.Texture;
    public ballTextures: PIXI.Texture[];
    public background: PIXI.Texture

    constructor(game: Game) {
        super();
        this.game = game;
        this.ballTextures = [];
    }  

    public loadAssets(): void {

        this.add('slidebar', '../assets/burgerXLB.png');
        this.add('ennemybar', '../assets/communist.png');
      //  this.add('trumpsheet', '../assets/trumpsheet.json');
        this.add('ballsheet', '../assets/ballsheet.json');
        this.add('background', '../assets/background.jpg');
        this.onProgress.add(() => {console.log("1 asset loaded")});
        this.add('trumpface', '../assets/trumpface.png');
        this.once('complete',this.onAssetsLoaded);

        this.load();
        
    }

    public onAssetsLoaded = (loader:PIXI.loaders.Loader, resources: PIXI.loaders.Resource):void => {
        
        // Create textures
        //this.ballTextures.push((resources as any)["trumpsheet"].textures["trump0.png"]);
        this.ballTextures.push((resources as any)["ballsheet"].textures["ball0.png"]);
        this.ballTextures.push((resources as any)["trumpface"].texture);
        this.ennemiSlideBar = (resources as any)["ennemybar"].texture
        this.slideBarTexture = (resources as any)["slidebar"].texture
        this.background = (resources as any)["background"].texture
        this.game.init();
    }


}