import SlideBar from './SlideBar'
import AISlideBar from './AISlideBar'
import Manager from './Manager'
import anim from './Ball'
import GameLoader from './GameLoader'
import Ball from './Ball'


export default class Game extends PIXI.Application {

    // Game name
    public name: string;
    public gameOver: boolean;

    // Manager for the game (controls and windows properties)
    public manager: Manager;
    private _loader: GameLoader;

    // HUMAN CONTROLED SLIDEBARS
    public bottomSlideBar: SlideBar;
    public rightSlideBar: SlideBar;

    // COMPUTER CONTROLED SLIDEBARS
    public upSlideBar: AISlideBar;
    public leftSlideBar: AISlideBar;

    // THE BALL
    public ball: Ball;
    
    // THE SOUNDS
    public ping: Howl;


    // Can be interesting
    //public interactionManager: PIXI.interaction.InteractionManager;


// ------------------------------------------------------------------------------------------------------------------

    constructor(name: string) {
        super();

        // Setup main properties
        this.name = name;
        this.gameOver = false;

        this.manager = new Manager(this);
        this._loader = new GameLoader(this);

        // Start loading the assets
        this._loader.loadAssets(); 
     //   const foo = PIXI.sound.Sound.from("../assets/ping.wav");
     //   foo.play();
       // sound.add("ping", "../assets/ping.wav")
    }

// ------------------------------------------------------------------------------------------------------------------

    public init(): void {
        this.renderer.backgroundColor = 0xFF00FF;
        this.renderer.autoResize = true;
        
        this.bottomSlideBar = new SlideBar(40,40, 'horizontal', 'human', this._loader.slideBarTexture);
        this.rightSlideBar = new SlideBar(200,200, 'vertical', 'human', this._loader.slideBarTexture);
        this.ball = new Ball(this._loader.ballTexture)
        // Could be interesting
        //this.interactionManager = new PIXI.interaction.InteractionManager(this.renderer);
        //this.ball.interactive = true;

        this.upSlideBar = new AISlideBar(200,40, 'horizontal','computer', this._loader.slideBarTexture, this.ball);
        this.leftSlideBar = new AISlideBar(200,40, 'vertical','computer', this._loader.slideBarTexture, this.ball);


        // SOUNDS
        this.ping = new Howl({src: ['../assets/ping.wav']})
        this.ping.play();


        this.stage.addChild(this.bottomSlideBar);
        this.stage.addChild(this.rightSlideBar);
        this.stage.addChild(this.ball);
        this.stage.addChild(this.upSlideBar);
        this.stage.addChild(this.leftSlideBar);

        this.manager.resizeGame();
        
        this.gameLoop()
    }

// ------------------------------------------------------------------------------------------------------------------

    public gameLoop(): void {

        // Loop the gameLoop function
        if(!this.gameOver){
            requestAnimationFrame(() => this.gameLoop());
        } else {
            this.resetGame();
        }

        // Animate 
        this.bottomSlideBar.move();
        this.rightSlideBar.move();
        this.ball.move();
        this.upSlideBar.move();
        this.leftSlideBar.move();
        

        // Check for collision
        if(!this.ballIsSafe()) {
            this.collide();
        }

        if(this.winner() !== 0){
            this.gameOver = true;
        }
        
        
        // Render the stage
        this.renderer.render(this.stage);
    }

// ------------------------------------------------------------------------------------------------------------------

    public collide(): boolean {

        let collide: boolean = false;

        // CHECKING RIGHT COLLISION
        if (this.rightSlideBar.containsPoint(this.ball.getCorners()[1]) || this.rightSlideBar.containsPoint(this.ball.getCorners()[2])) {
            this.ball.direction = this.newDirection("right");
            collide = true;
        }

        // CHECKING BOTTOM COLLISION
        if( this.bottomSlideBar.containsPoint(this.ball.getCorners()[2]) || this.bottomSlideBar.containsPoint(this.ball.getCorners()[3]) ) {
                this.ball.direction = this.newDirection("bottom");
                collide = true;
        }

        // CHECKING TOP COLLISION
        if (this.upSlideBar.containsPoint(this.ball.getCorners()[0]) || this.upSlideBar.containsPoint(this.ball.getCorners()[1])) {
            this.ball.direction = this.newDirection("top");
            collide = true;
        }

        // CHECKING LEFT COLLISION
        if( this.leftSlideBar.containsPoint(this.ball.getCorners()[0]) || this.leftSlideBar.containsPoint(this.ball.getCorners()[3]) ) {
                this.ball.direction = this.newDirection("left");
                collide = true;
        }

        return collide;
    }

// ------------------------------------------------------------------------------------------------------------------

    public ballIsSafe():boolean {
        if (this.ball.position.x > 100) {
            if(this.ball.position.x < this.rightSlideBar.position.x - 30) {
                if (this.ball.position.y > 100 ){
                    if (this.ball.position.y < this.bottomSlideBar.y - 30){
                        return true;
                    }
                }
            }
        }
        return false;
    }

// ------------------------------------------------------------------------------------------------------------------

    public winner(): number {
        let corners = this.ball.getCorners();
        let tl = corners[0];
        let tr = corners[1];
        let br = corners[2];
        let bl = corners[3]

        // Top collision
        if(tl.y < 0) {
            console.log("Top collision")
            return 1;
        }
        // Left collision
        if(tl.x < 0) {
            console.log("Left collision");
            return 1;
        }
        // Bottom collision
        if(br.y > this.manager.getSize()) {
            console.log("bottom collision");
            return 2;
        }
        // Right collision
        if(br.x > this.manager.getSize()) {
            console.log("right collision");
            return 2;
        }
        return 0;
    }

// ------------------------------------------------------------------------------------------------------------------

    public resetGame():void {
        this.ball.position.set(200,350);
        this.ball.direction = 3*Math.PI / 2;      
        this.gameOver = false;
        this.gameLoop()
    }

// ------------------------------------------------------------------------------------------------------------------

    public newDirection(slidebar: string): number {
        var coef: number;
        var direction: number = this.ball.direction + Math.PI;
        
        switch (slidebar) {
            case "bottom": 
                coef = (this.ball.x - this.bottomSlideBar.x) / (this.ball.width/2 + this.bottomSlideBar.width/2);
                direction = Math.PI/2 - coef * Math.PI/3;
                break;
            case "right":
                coef = (this.ball.y - this.rightSlideBar.y) / (this.ball.width/2 + this.rightSlideBar.width/2);
                direction = Math.PI + coef * Math.PI/3;
                break;
            case "left":
                coef = (this.ball.y - this.leftSlideBar.y) / (this.ball.width/2 + this.leftSlideBar.width/2);
                direction = - coef * Math.PI/3;
                break;
            case "top":
                coef = (this.ball.x - this.upSlideBar.x) / (this.ball.width/2 + this.upSlideBar.width/2);
                direction = 3*Math.PI/2 + coef * Math.PI/3;
                break;
        }
        return direction;
    }

// ------------------------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------------------------


}


