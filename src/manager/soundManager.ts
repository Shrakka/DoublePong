import * as Assets from '../assets';

export default class SoundManager extends Phaser.SoundManager {

    public menuMusic: Phaser.Sound = null;
    public gameMusic: Phaser.Sound = null;

    private shieldSFX: Phaser.Sound = null;
    private settingsSFX: Phaser.Sound = null;
    private pingSprite: Phaser.AudioSprite = null;
    private pingSFX: any[] = null;

    private sfxVolume: number = null;
    private musicVolume: number = null;


    constructor(game: Phaser.Game) {
        super(game);
        this.addSounds();

        this.sfxVolume = 0.5;
        this.musicVolume = 0.5;

        this.setMusicVolume(this.musicVolume);
        this.setSfxVolume(this.sfxVolume);
    }

    // --------------------------------------------------------------------------

    public addSounds(): void {
        this.menuMusic = this.game.sound.add(Assets.Audio.AudioMenumusic.getName());
        this.gameMusic = this.game.sound.add(Assets.Audio.AudioUSA.getName());
        this.shieldSFX = this.game.sound.add(Assets.Audio.AudioSword.getName());
        this.settingsSFX = this.game.sound.add(Assets.Audio.AudioPaper1.getName());
        this.pingSprite = this.game.sound.addSprite(Assets.Audiosprites.AudiospritesSounds.getName());
        this.pingSFX = [
            Assets.Audiosprites.AudiospritesSounds.Sprites.Sfx1,
            Assets.Audiosprites.AudiospritesSounds.Sprites.Sfx2,
            Assets.Audiosprites.AudiospritesSounds.Sprites.Sfx3,
            Assets.Audiosprites.AudiospritesSounds.Sprites.Sfx4,
            Assets.Audiosprites.AudiospritesSounds.Sprites.Sfx5,
            Assets.Audiosprites.AudiospritesSounds.Sprites.Sfx6
        ]; 
    }

    // --------------------------------------------------------------------------

    public play(key: string, volume?: number, loop?: boolean): Phaser.Sound {
        switch(key) {
            case 'playButton': this.shieldSFX.play(); break;
            case 'settingsButton': this.settingsSFX.play(); break;
            case 'menuMusic': this.menuMusic.play(); break;
            case 'gameMusic': this.gameMusic.play(); break;
            default: super.play(key, volume, loop); break;
        }

        return null;
    }

    // --------------------------------------------------------------------------

    public stop(key: string): void {
        switch(key) {
            case 'menuMusic': this.menuMusic.stop(); break;
            case 'gameMusic': this.gameMusic.stop(); break;
            default: this.game.sound.stopAll();
        }
    }

    public playRandomPing(): void {
        this.pingSprite.play(Phaser.ArrayUtils.getRandomItem(this.pingSFX), this.sfxVolume);
    }

    public setMusicVolume(value: number): void {
        if(value > 1) {
            value = 1;
        }

        if(value < 0) {
            value = 0;
        }

        this.musicVolume = value;
        this.menuMusic.volume = value;
        this.gameMusic.volume = value;

    }

    public setSfxVolume(value: number): void {
        if(value > 1) {
            value = 1;
        }

        if(value < 0) {
            value = 0;
        }

        this.sfxVolume = value;
        this.shieldSFX.volume = value;
        this.settingsSFX.volume = value;
    }

}