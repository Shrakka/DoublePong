import * as Assets from '../assets';
import SoundManager from '../manager/soundManager';

export default class Menu extends Phaser.State {

    private americanFlag: Phaser.Sprite = null;
    private title: Phaser.Sprite = null;
    private playButton: Phaser.Button = null;
    private playText: Phaser.Text = null;
    private settingButton: Phaser.Button = null;
    private settingText: Phaser.Text = null;

    private mouseOverPlayButton: boolean = false;
    private mouseOverSettingsButton: boolean = false;

    // -----------------------------------------------------------------------------------------------

//    public init(...params): void {
//        if(params[0].playMusic) {
//            this.menuMusic = new Phaser.Sound(this.game, Assets.Audio.AudioMenumusic.getName());
//            this.menuMusic = this.game.add.audio(Assets.Audio.AudioMenumusic.getName());
//            this.menuMusic.play();
//            (this.game.sound as SoundManager).playMenuMusic();
//        }
//    }

    // -----------------------------------------------------------------------------------------------

    public create(): void { 

        // Add background image
        this.americanFlag = this.game.add.sprite(0,0, Assets.Images.ImagesAmericanflag.getName());
        this.americanFlag.height = this.game.height;

        // Add title to the game
        this.title = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 120, Assets.Images.ImagesTitle.getName());
        this.title.anchor.setTo(0.5);
        this.title.scale.setTo(0.7);
        this.title.x -= 40;
        this.title.y -= 15;

        // Add the PLAY and Settings buttons
        this.addPlay();
        this.addSettings();
        
        // Fade awayyyy
        this.game.camera.flash(0x000000, 500);
    }

    // -----------------------------------------------------------------------------------------------

    public addPlay(): void {
        // Shield Button
        this.playButton = this.game.add.button(100,437,Assets.Images.ImagesShield.getName());
        this.playButton.anchor.setTo(0.5);
        this.playButton.scale.setTo(0.5);
        this.playButton.interactive = true;
        this.playButton.onInputOver.add(this.animatePlayOn, this);
        this.playButton.onInputOut.add(this.animatePlayOff, this);
        this.playButton.onInputUp.add(this.playPressed,this);

        // PlayText
        this.playText = this.game.add.text(255, 445, 'PLAY', {font: '95px ' + Assets.CustomWebFonts.FontsAmericanCaptain.getFamily()});
        this.playText.anchor.setTo(0.5);
        this.playText.addColor('rgb(60,59,110)', 0);
        this.playText.setShadow(2,2);
        this.playText.interactive = true;
        this.playText.inputEnabled = true;
        this.playText.events.onInputOver.add(this.animatePlayOn, this);
        this.playText.events.onInputOut.add(this.animatePlayOff, this);
        this.playText.events.onInputUp.add(this.playPressed,this);
    }

    // -----------------------------------------------------------------------------------------------

    public addSettings(): void {
        // Setting Button
        this.settingButton = this.game.add.button(536,531, Assets.Images.ImagesFries.getName());
        this.settingButton.scale.setTo(0.25);
        this.settingButton.anchor.setTo(0.5);
        this.settingButton.interactive = true;
        this.settingButton.onInputOver.add(this.animateSettingsOn,this);
        this.settingButton.onInputOut.add(this.animateSettingsOff,this);
        this.settingButton.onInputUp.add(this.settingsPressed, this);

        // Setting Text
        this.settingText = this.game.add.text(399, 537, 'Credits & Settings', {font: '32px ' + Assets.CustomWebFonts.FontsAmericanCaptain.getFamily()});
        this.settingText.anchor.setTo(0.5);
        this.settingText.addColor('rgb(60,59,110)', 0);
        this.settingText.alpha = 0;
    }

    public animatePlayOn(): void {
        this.game.canvas.style.cursor = "pointer";
        this.mouseOverPlayButton = true;
        let shieldTween = this.game.add.tween(this.playButton).to({rotation: -2*Math.PI}, 800, Phaser.Easing.Quartic.Out).start();
        let textTween = this.game.add.tween(this.playText).to({fontSize: '4px'}, 500, Phaser.Easing.Quadratic.Out).start();
        this.playText.setShadow(3,3,'rgba(0,0,0,0.9)',1);
        (this.game.sound as SoundManager).play('playButton');
    }

    public animatePlayOff(): void {
        this.game.canvas.style.cursor = "default";
        this.mouseOverPlayButton = false;
        let shieldTween = this.game.add.tween(this.playButton).to({rotation: 0}, 800, Phaser.Easing.Quadratic.Out).start();
        let textTween = this.game.add.tween(this.playText).to({fontSize: '-4px'}, 500, Phaser.Easing.Quadratic.Out).start();
        this.playText.setShadow(2,2);
    }


    public animateSettingsOn(): void {
        this.game.canvas.style.cursor = "pointer";
        this.mouseOverSettingsButton = true;
        let friesTween = this.game.add.tween(this.settingButton).to({rotation: Math.PI/2},1000, Phaser.Easing.Quadratic.Out).start();
        let textSettingTween = this.game.add.tween(this.settingText).to({alpha:1},1000,Phaser.Easing.Linear.None).start();
        (this.game.sound as SoundManager).play('settingsButton');
        
    }

    public animateSettingsOff(): void {
        this.game.canvas.style.cursor = "default";
        this.mouseOverSettingsButton = false;
        let friesTween = this.game.add.tween(this.settingButton).to({rotation: 0},1000, Phaser.Easing.Quadratic.Out).start();
        let textSettingTween = this.game.add.tween(this.settingText).to({alpha:0},1000, Phaser.Easing.Quadratic.Out).start();
    }

    public playPressed(): void {
        if(this.mouseOverPlayButton) {
            (this.game.sound as SoundManager).stop('menuMusic');
            this.game.state.start('game');

        }
    }

    public settingsPressed(): void {
        if(this.mouseOverSettingsButton) {
            this.game.state.start('settings');
        }
    }

}