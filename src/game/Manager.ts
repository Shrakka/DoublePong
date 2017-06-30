import Game from './Game'

export default class Manager {

    public game: Game;
    private _size: number;

    constructor(game: Game){
        this.game = game;
        this._size = window.innerHeight > window.innerWidth ? innerWidth : innerHeight; 
        this.setWindowProperties();
        this.setControl();
    }

    public setWindowProperties(){
        window.addEventListener('resize', () => { this.resizeGame() });
    }

    public setControl(): void {
        document.addEventListener('keydown', (key) => { this.keydown(key.keyCode)});
        document.addEventListener('keyup', (key) => { this.keyup(key.keyCode)})
    }

    public resizeGame(): void {
        
        let lastSize = this._size;
        let size = this.getSize();

        // Do not resize the stage or bullshit happens
        //this.game.stage.height = size;
        //this.game.stage.width = size;

        // Resize the bar directly, maybe add a specific container for them in the future for easy resizing 
        this.game.bottomSlideBar.scale.set(this.getSize()/1000,this.getSize()/1000);
        this.game.rightSlideBar.scale.set(this.getSize()/1000,this.getSize()/1000);
        this.game.upSlideBar.scale.set(this.getSize()/1000,this.getSize()/1000);
        this.game.leftSlideBar.scale.set(this.getSize()/1000,this.getSize()/1000);

        // Place the element properly
        this.game.bottomSlideBar.position.y = 0.9 * size; 
        this.game.rightSlideBar.position.x = 0.9 * size;
        this.game.upSlideBar.position.y = 0.1 * size; 
        this.game.leftSlideBar.position.x = 0.1 * size;

        this.game.bottomSlideBar.position.x = this.game.bottomSlideBar.position.x * size / lastSize
        this.game.rightSlideBar.position.y = this.game.rightSlideBar.position.y * size / lastSize
        this.game.upSlideBar.position.x = this.game.bottomSlideBar.position.x * size / lastSize
        this.game.leftSlideBar.position.y = this.game.rightSlideBar.position.y * size / lastSize

        // Resize ball
        //this.game.ball.position.set(this.game.ball.position.x * size / lastSize, this.game.ball.position.y * size / lastSize)

        this.game.renderer.resize(size, size);
        this.game.renderer.render(this.game.stage);
    }


    public getSize(): number {
        this._size = window.innerHeight > window.innerWidth ? innerWidth : innerHeight;
        return this._size;
    }

    public static getSizeStatic(): number {
        return window.innerHeight > window.innerWidth ? innerWidth : innerHeight;
    }

    public keydown(keyCode: number): void{
        switch(keyCode){
            case 37: this.startMoveLeft(); break;
            case 38: this.startMoveUp();break;
            case 39: this.startMoveRight();break;
            case 40: this.startMoveDown();break;
        }
    }

    public keyup(keyCode: number): void{
        switch(keyCode){
            case 37: this.stopMoveLeft(); break;
            case 38: this.stopMoveUp();break;
            case 39: this.stopMoveRight();break;
            case 40: this.stopMoveDown();break;
        }
    }


    public startMoveLeft(){
        this.game.bottomSlideBar.left = true;
    }

    public stopMoveLeft(){
        this.game.bottomSlideBar.left = false;
    }

    public startMoveRight(){
        this.game.bottomSlideBar.right = true;
    }

    public stopMoveRight(){
        this.game.bottomSlideBar.right = false;
    }


    public startMoveUp(){
       this.game.rightSlideBar.up = true;
    }

    public stopMoveUp(){
        this.game.rightSlideBar.up = false;
    }
    public startMoveDown(){
       this.game.rightSlideBar.down = true;
    }

    public stopMoveDown(){
       this.game.rightSlideBar.down = false;
    }


}