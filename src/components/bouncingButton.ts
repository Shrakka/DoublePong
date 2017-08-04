import SoundManager from '../manager/soundManager';

export default class BouncingButton extends Phaser.Button {

    constructor(game: Phaser.Game, x?: number, y?: number, key?: string) {
        super(game, x, y, key);
        this.createButton();
    }

    public createButton(): void {
        this.interactive = true;
        this.inputEnabled = true;
        this.anchor.setTo(0.5);
        this.onInputOver.add(this.bounce, this);
        this.game.add.existing(this);
    }

    public bounce(): void {
        (this.game.sound as SoundManager).play('settingsButton');
        let tween1 = this.game.add.tween(this).to({rotation: -Math.PI/10},100, Phaser.Easing.Sinusoidal.Out);
        let tween2 = this.game.add.tween(this).to({rotation: Math.PI/10},100, Phaser.Easing.Sinusoidal.Out);
        let tween3 = this.game.add.tween(this).to({rotation: 0},100, Phaser.Easing.Sinusoidal.Out);
        tween1.chain(tween2);
        tween2.chain(tween3);
        tween1.start();
    }
}