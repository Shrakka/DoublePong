import * as Assets from '../assets';
import SettingSlide from '../components/settingslide';
import SoundManager from '../manager/soundManager';
import BouncingButton from '../components/bouncingButton';

export default class Settings extends Phaser.State {

    private americanFlag: Phaser.Sprite = null;
    private creditsText: Phaser.Sprite = null;
    private menuButton: Phaser.Button = null;

    private soundIcon: Phaser.Sprite = null;
    private musicIcon: Phaser.Sprite = null;
    private soundSlider: SettingSlide = null;
    private musicSlider: SettingSlide = null;

     public create(): void { 

        // Add background image
        this.americanFlag = this.game.add.sprite(0,0, Assets.Images.ImagesAmericanflag.getName());
        this.americanFlag.height = this.game.height;

        this.creditsText = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY-10, Assets.Images.ImagesCredits.getName());
        this.creditsText.anchor.setTo(0.5);

        this.addMenuButton();
        this.addSliders();

        this.game.camera.flash(0x000000, 500);
    }

    public addMenuButton(): void {
        this.menuButton = new BouncingButton(this.game, 536, 554, Assets.Images.ImagesWhitehouse.getName());
        this.menuButton.scale.setTo(0.2);
        this.menuButton.onInputOver.add(()=> { 
            (this.game.sound as SoundManager).play('settingsButton');
        }, this);
        this.menuButton.onInputUp.add(this.backToMenu, this);
    }
    public addSliders(): void {
        this.musicIcon = this.game.add.sprite(70,554, Assets.Images.ImagesSpeaker.getName());
        this.musicIcon.anchor.setTo(0.5);
        this.musicIcon.scale.setTo(0.23);


        this.soundIcon = this.game.add.sprite(300, 554, Assets.Images.ImagesMusicicon.getName());
        this.soundIcon.anchor.setTo(0.5);
        this.soundIcon.scale.setTo(0.23);

        this.musicSlider = new SettingSlide(this.game, 172, 554, 'music');
        this.soundSlider = new SettingSlide(this.game, 405, 554, 'sfx');


    }

    public backToMenu(): void {
        this.game.state.start('menu');
    }

}