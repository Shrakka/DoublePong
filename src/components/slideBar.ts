import Ball from './ball';

export default class SlideBar extends Phaser.Sprite {

    private _horizontal: boolean;
    private _human: boolean;
    private _speed: number;
    private _offset: number;
    private _pause: boolean;

    constructor(game: Phaser.Game, x: number, y: number, key: string, horizontal: string, human: string) {
        super(game, x, y, key);
        this._horizontal = horizontal === 'horizontal' ? true: false;
        this._human = human === 'human' ? true: false;
        this.initSlideBar();
    }

    initSlideBar(): void {

        this.anchor.setTo(0.5);
        this._speed = 5;
        this._offset = 0;
        this._pause = false;

        if(!this._horizontal) {
            this.rotation = -Math.PI/2;
        }
    }

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }

    public AIMove(ball: Ball): void {
        if(!this._pause) {
            if(this._horizontal) { // TOP BAR
                if(ball.x > this.position.x && this.position.x < 650) {
                    this.position.x += this._speed;
                }
                
                if(ball.x < this.position.x && this.position.x > -50) {
                    this.position.x -= this._speed;
                }
            } 
            else {
            if(ball.y > this.position.y && this.position.y < 650) {
                    this.position.y += this._speed;
                }
                
                if(ball.y < this.position.y && this.position.y > -50) {
                    this.position.y -= this._speed;
                }
       }
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

    get xMin(): number {
        if(this._horizontal) {
            return this.x - this.width/2 - this._offset;
        }else {
            return this.x - this.height/2 - this._offset;
        }
    }

    get xMax(): number {
        if(this._horizontal) {
            return this.x + this.width/2 + this._offset;
        }else {
            return this.x + this.height/2 + this._offset;
        }
    }

    get yMin(): number {
        if(this._horizontal) {
            return this.y - this.height/2 - this._offset;
        }else {
            return this.y - this.width/2 - this._offset;
        }
    }

    get yMax(): number {
        if(this._horizontal) {
            return this.y + this.height/2 + this._offset;
        }else {
            return this.y + this.width/2 + this._offset;
        }
    }

}