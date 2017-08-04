import * as Assets from '../assets';
import * as AssetUtils from '../utils/assetUtils';
import SoundManager from '../manager/soundManager';

export default class Preloader extends Phaser.State {
    private americanFlag: Phaser.Sprite = null;
    private title: Phaser.Sprite = null;
    private preloadBarSprite: Phaser.Sprite = null;
    private preloadFrameSprite: Phaser.Sprite = null;
    

    public preload(): void {
        
        // Add background image
        this.americanFlag = this.game.add.sprite(0,0, Assets.Images.ImagesAmericanflag.getName());
        this.americanFlag.height = this.game.height;

        // Add title to the game
        this.title = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 120, Assets.Images.ImagesTitle.getName());
        this.title.anchor.setTo(0.5);
        this.title.scale.setTo(0.7);
        this.title.x -= 40;
        this.title.y -= 15;

        // Add the rest 
        this.addPreloadBar();

        // Load the assets
        AssetUtils.Loader.loadAllAssets(this.game, this.waitForSoundDecoding, this);
    }

    private addPreloadBar(): void {

        this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+163, Assets.Atlases.AtlasesLoadbar.getName(), Assets.Atlases.AtlasesLoadbar.Frames.Border);
        this.preloadFrameSprite.anchor.setTo(0, 0.5);
        this.preloadFrameSprite.x -= this.preloadFrameSprite.width * 0.5;

        this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+163, Assets.Atlases.AtlasesLoadbar.getName(), Assets.Atlases.AtlasesLoadbar.Frames.Burger);
        this.preloadBarSprite.anchor.setTo(0, 0.5);
        this.preloadBarSprite.x -= this.preloadBarSprite.width * 0.5;
        this.game.load.setPreloadSprite(this.preloadBarSprite);
    }

    private waitForSoundDecoding(): void {
        AssetUtils.Loader.waitForSoundDecoding(this.startGame, this);
    }

    private startGame(): void {
        this.game.camera.onFadeComplete.addOnce(this.loadMenu, this);
        this.game.camera.fade(0x000000, 500);

    }

    private loadMenu(): void {
        this.game.sound = new SoundManager(this.game);
        (this.game.sound as SoundManager).play('menuMusic');
        this.game.state.start('menu');
    }
}
