import * as Assets from '../assets';

export default class Ball extends Phaser.Sprite {

    private _speed: number = null;
    private _direction: number = null;
    private _frameArray: any[] = null;
    private _offset: number = null;
    private _pause: boolean = null;
    private _collisions: number = null;

    constructor(game: Phaser.Game, x: number, y: number, key: string, frameArray: any[]) {
        super(game, x, y, key, frameArray[0]);
        this._frameArray = frameArray;
        this.initBall();
    }

    public initBall(): void {
        this.anchor.setTo(0.5);
        this._speed = 5;
        this._direction = Math.PI/2;
        this._offset = -10;
        this._pause = false;
        this._collisions = 0;
    }

    public collide(): void {
        //this.frameName = this._frameArray[Math.floor(Math.random()*this._frameArray.length)];
        this.frameName = Phaser.ArrayUtils.getRandomItem(this._frameArray);
        this._collisions += 1;
        if(this._collisions % 4 === 0) {
            this._speed +=1;
        }
    }

    public move(): void {
        if(!this._pause) {
            this.position.set(this.position.x+ this._speed * Math.cos(this._direction), this.position.y - this._speed * Math.sin(this._direction));
        }
    }

    public pause(): void {
        this._pause = true;
        this.alpha = 0.5;
    }

    public resume(): void {
        this._pause = false;
        this.alpha = 1;
    }

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }


    get direction(): number {
        return this._direction;
    }

    set direction(value: number) {
        this._direction = value;
    }

    get xMin(): number {
        return this.x - this.width/2 - this._offset;
    }

    get xMax(): number {
        return this.x + this.width/2 + this._offset;
    }

    get yMin(): number {
        return this.y - this.height/2 - this._offset;
    }

    get yMax(): number {
        return this.y + this.height/2 + this._offset;
    }

    get collision(): number {
        return this._collisions;
    }

} 