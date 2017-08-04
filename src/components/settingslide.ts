import * as Assets from '../assets';
import SoundManager from '../manager/soundmanager';

export default class SettingSlide extends Phaser.Group {

    private key: string;
    private slide: Phaser.Sprite;
    private dot: Phaser.Sprite;

    constructor(game: Phaser.Game, x: number, y: number, key: string) {
        super(game);
        this.x = x;
        this.y = y;
        this.key = key;

        this.createSlideBar();
    }

    public createSlideBar(): void {

        this.slide = this.game.add.sprite(this.x, this.y, Assets.Images.ImagesSettingbar.getName());
        this.slide.scale.setTo(0.4);
        this.slide.anchor.setTo(0.5, 0.5);

        this.dot = this.game.add.sprite(this.x, this.y, Assets.Images.ImagesSettingdot.getName());
        this.dot.scale.setTo(0.4);
        this.dot.anchor.setTo(0.5);

        // Interactions
        this.dot.inputEnabled = true;
        this.dot.interactive = true;

        this.dot.input.draggable = true;
        this.dot.input.allowHorizontalDrag = true;
        this.dot.input.allowVerticalDrag = false;

        this.dot.events.onDragUpdate.add(()=> {
            if(this.dot.x >= this.slide.x + this.slide.width/2) {
                this.dot.x = this.slide.x + this.slide.width/2;
            }

            if(this.dot.x <= this.slide.x - this.slide.width/2) {
                this.dot.x = this.slide.x - this.slide.width/2;
            }

            this.updateProperty();

        }, this);


    }

    public updateProperty(): void {

        switch(this.key) {
            case 'music': 
                (this.game.sound as SoundManager).setMusicVolume(this.calculateCoef(this.dot.x));
                break;
            case 'sfx': 
                (this.game.sound as SoundManager).setSfxVolume(this.calculateCoef(this.dot.x));
                break;
        }

    }

    public calculateCoef(x: number): number {
        let value = (x + this.slide.width/2 - this.slide.x)/this.slide.width;
        return Math.round(value*100)/100;
    }

}