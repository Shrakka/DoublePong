import * as Assets from '../assets';
import SlideBar from '../components/slideBar';
import BouncingButton from '../components/bouncingButton';
import Ball from '../components/ball';
import SoundManager from '../manager/soundManager';

export default class Game extends Phaser.State {

    // -------------------------------------------------------------------------------

    // SETTINGS
    public background: Phaser.Sprite = null;
    public audioSprite: Phaser.AudioSprite = null;
    public pingSounds: any[] = null;
    public music: any = null;
    public gamePaused: boolean = null;
    public countDownOver: boolean = null;
    // HUMAN CONTROLED SLIDEBARS
    public bottomSlideBar: SlideBar = null;
    public rightSlideBar: SlideBar = null;
    public keyboard: Phaser.CursorKeys = null; 
    // COMPUTER CONTROLED SLIDEBARS
    public topSlideBar: SlideBar;
    public leftSlideBar: SlideBar;
    // THE BALL
    public trumpFaceArray: any[] = null;
    public ball: Ball = null;
    public ball2: Ball = null;
    // PAUSE SPRITE
    public whiteBoard: Phaser.Sprite;
    public menuButton: BouncingButton;
    public ResumeButton: BouncingButton;
    public settingsButton: BouncingButton;
    // PAUSE TEXTS
    public resumeText: Phaser.Text;
    public menuText: Phaser.Text;
    public settingsText: Phaser.Text;

    // -------------------------------------------------------------------------------

    public create(): void { 
        
        this.gamePaused = false;
        this.countDownOver = false;
        
        // Background
        this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Images.ImagesGamebackground.getName());
        this.background.anchor.setTo(0.5);
        this.background.scale.setTo(0.66);

        // Audio setup
        this.audioSprite = this.game.add.audioSprite(Assets.Audiosprites.AudiospritesSounds.getName());
        this.pingSounds = [
            Assets.Audiosprites.AudiospritesSounds.Sprites.Sfx1,
            Assets.Audiosprites.AudiospritesSounds.Sprites.Sfx2,
            Assets.Audiosprites.AudiospritesSounds.Sprites.Sfx3,
            Assets.Audiosprites.AudiospritesSounds.Sprites.Sfx4,
            Assets.Audiosprites.AudiospritesSounds.Sprites.Sfx5,
            Assets.Audiosprites.AudiospritesSounds.Sprites.Sfx6
        ]; 
        
        // SlideBars
        this.bottomSlideBar = new SlideBar(this.game, 300, 565, Assets.Images.ImagesSmallburger.getName(), 'horizontal', 'human');
        this.bottomSlideBar.scale.setTo(0.4);
        this.game.add.existing(this.bottomSlideBar);
        this.physics.arcade.enable(this.bottomSlideBar);

        this.rightSlideBar = new SlideBar(this.game, 565, 300, Assets.Images.ImagesSmallburger.getName(), 'vertical', 'human');
        this.rightSlideBar.scale.setTo(0.4);
        this.game.add.existing(this.rightSlideBar);
        this.physics.arcade.enable(this.rightSlideBar);

        this.topSlideBar = new SlideBar(this.game, 300, 35, Assets.Images.ImagesSmalltacos.getName(), 'horizontal', 'human');
        this.topSlideBar.scale.set(0.4);
        this.game.add.existing(this.topSlideBar);
        this.physics.arcade.enable(this.topSlideBar);

        this.leftSlideBar = new SlideBar(this.game, 35, 300, Assets.Images.ImagesSmalltacos.getName(), 'verical', 'human');
        this.leftSlideBar.scale.set(0.4);
        this.game.add.existing(this.leftSlideBar);
        this.physics.arcade.enable(this.leftSlideBar);
        
        // Set keyboard
        this.keyboard = this.game.input.keyboard.createCursorKeys();

        // Start music
        (this.game.sound as SoundManager).play('gameMusic');

        // Settings
        this.game.onPause.add(this.pauseScreen, this);
        //this.game.onResume.add(this.resumeGame, this);

        // Start Game
        this.countDown(() => this.addBall());
    }

    // -------------------------------------------------------------------------------

    public countDown(callback: Function): void {
        let number3 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Images.Images3.getName());
        number3.anchor.setTo(0.5);
        number3.scale.setTo(1.5);

        let small3 = this.game.add.tween(number3.scale).to({x: 0.5, y: 0.5}, 800, Phaser.Easing.Quartic.Out);
        let fade3 = this.game.add.tween(number3).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.In);

        fade3.onComplete.add(
            ()=> { 
                let number2 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Images.Images2.getName());
                number2.anchor.setTo(0.5);
                number2.scale.setTo(1.5);

                let small2 = this.game.add.tween(number2.scale).to({x: 0.5, y: 0.5}, 800, Phaser.Easing.Quartic.Out).start();
                let fade2 = this.game.add.tween(number2).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.In).start();

                fade2.onComplete.add(
                    () => {
                        let number1 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Images.Images1.getName());
                        number1.anchor.setTo(0.5);
                        number1.scale.setTo(1.5);

                        let small1 = this.game.add.tween(number1.scale).to({x: 0.5, y: 0.5}, 800, Phaser.Easing.Quartic.Out).start();
                        let fade1 = this.game.add.tween(number1).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.In).start();

                        fade1.onComplete.add(callback);
                        this.countDownOver = true;
                    }
                );
            }
        );
        small3.start();
        fade3.start();
    }

    // -------------------------------------------------------------------------------

    public addBall(): void {
        // Ball
         this.trumpFaceArray = [
            Assets.Atlases.AtlasesTrump.Frames.Trump1,
            Assets.Atlases.AtlasesTrump.Frames.Trump2,
            Assets.Atlases.AtlasesTrump.Frames.Trump3,
            Assets.Atlases.AtlasesTrump.Frames.Trump4,
            Assets.Atlases.AtlasesTrump.Frames.Trump5,
            Assets.Atlases.AtlasesTrump.Frames.Trump6,
            Assets.Atlases.AtlasesTrump.Frames.Trump7
        ];
        this.ball = new Ball(this.game, this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesTrump.getName(), this.trumpFaceArray);
        this.ball.scale.setTo(0.33);
        this.game.add.existing(this.ball);

        // Set collision engine
        this.physics.arcade.enable(this.ball);

        this.startGame();        
    }

    // -------------------------------------------------------------------------------

    public startGame(): void {
        this.gameLoop();
    }
    
    // -------------------------------------------------------------------------------

    public gameLoop() {
        
        // Loop the loop baby
        if(!this.gamePaused) {
            requestAnimationFrame(() => this.gameLoop());
        } else {
            //this.game.state.start('gameover');
        }

        // this.game.debug.soundInfo((this.game.sound as SoundManager).gameMusic, 10,10);

        // Game plays
        this.playerMove();
        this.leftSlideBar.AIMove(this.ball);
        this.topSlideBar.AIMove(this.ball);
        this.ball.move();

        if(!this.ballIsSafe(this.ball)) {
            this.checkCollisions(this.ball);
        }
    }

// -------------------------------------------------------------------------------

    public calculateDirection(slidebar: string, ball: Ball): number {
        let coef: number = null;
        let direction: number = ball.direction + Math.PI;
        
        switch (slidebar) {
            case "bottom": 
                coef = (ball.x - this.bottomSlideBar.x) / (ball.width/2 + this.bottomSlideBar.width/2);
                direction = Math.PI/2 - coef * Math.PI/3;
                break;
            case "right":
                coef = (ball.y - this.rightSlideBar.y) / (ball.width/2 + this.rightSlideBar.width/2);
                direction = Math.PI + coef * Math.PI/3;
                break;
            case "left":
                coef = (ball.y - this.leftSlideBar.y) / (ball.width/2 + this.leftSlideBar.width/2);
                direction = - coef * Math.PI/3;
                break;
            case "top":
                coef = (ball.x - this.topSlideBar.x) / (ball.width/2 + this.topSlideBar.width/2);
                direction = 3*Math.PI/2 + coef * Math.PI/3;
                break;
        }
        return direction;
    }

// -------------------------------------------------------------------------------

    public playerMove(): void {
        if(this.keyboard.right.isDown) {
            if(this.bottomSlideBar.x < 650) {
                this.bottomSlideBar.x += this.bottomSlideBar.speed;
            }
        }

        if(this.keyboard.left.isDown) {
            if(this.bottomSlideBar.x > -50) {
                this.bottomSlideBar.x -= this.bottomSlideBar.speed;
            }
        }

        if(this.keyboard.up.isDown) {
            if(this.rightSlideBar.y > -50) {
                this.rightSlideBar.y -= this.rightSlideBar.speed;
            }
        }

        if(this.keyboard.down.isDown) {
            if(this.rightSlideBar.y < 650) {
                this.rightSlideBar.y += this.rightSlideBar.speed;
            }
        }
    }

// -------------------------------------------------------------------------------

    public ballIsSafe(ball: Ball): boolean {
        if(ball.xMin > 65 && ball.xMin < 535 && ball.yMin > 65 && ball.yMax < 535) {
            return true;
        } else {
            return false;
        }
    }

    public checkCollisions(ball: Ball): void {

   //     4 | 2
   //     -----
   //     3 | 1

        if(ball.x > 300) {
            if(ball.y > 300) {
                this.checkRightCollision(ball);
                this.checkBottomCollision(ball);
            } else {
                this.checkRightCollision(ball);
                this.checkTopCollision(ball);
            }
        } else {
            if(ball.y > 300) {
                this.checkLeftCollision(ball);
                this.checkBottomCollision(ball);

            } else {
                this.checkLeftCollision(ball);
                this.checkTopCollision(ball);
            }
        }

        if(ball.xMin <= 0 || ball.yMin <= 0) {
            // computer loose
            ball.position.set(300,300);
            ball.speed = 5;
        }
        if(ball.xMax >= 600 || ball.yMax >= 600) {
            // player loose
            ball.position.set(300,300);
            ball.speed = 5;
        }

    }

    public checkRightCollision(ball: Ball): void {
        if(ball.xMax >= this.rightSlideBar.xMin && ball.yMin < this.rightSlideBar.yMax && ball.yMax > this.rightSlideBar.yMin) {
            ball.direction = this.calculateDirection("right", ball);
            ball.collide();
            (this.game.sound as SoundManager).playRandomPing();
        }  
    }

    public checkLeftCollision(ball: Ball): void {
        if(ball.xMin <= this.leftSlideBar.xMax && ball.yMin < this.leftSlideBar.yMax && ball.yMax > this.leftSlideBar.yMin) {
            ball.direction = this.calculateDirection("left", ball);
            ball.collide();
            (this.game.sound as SoundManager).playRandomPing();
        }  
    }

    public checkTopCollision(ball: Ball): void {
        if(ball.yMin <= this.topSlideBar.yMax && ball.xMin < this.topSlideBar.xMax && ball.xMax > this.topSlideBar.xMin) {
            ball.direction = this.calculateDirection("top", ball);
            ball.collide();
            (this.game.sound as SoundManager).playRandomPing();
        }  
    }

    public checkBottomCollision(ball: Ball): void {
        if(ball.yMax >= this.bottomSlideBar.yMin && ball.xMin <= this.bottomSlideBar.xMax && ball.xMax >= this.bottomSlideBar.xMin) {
            ball.direction = this.calculateDirection("bottom", ball);
            ball.collide();
            (this.game.sound as SoundManager).playRandomPing();
        }  
    }

// -------------------------------------------------------------------------------

    public pauseScreen(): void {
        
        if(!this.gamePaused && this.countDownOver) {
            this.gamePaused = true;

            // Stop the game
            this.ball.pause();
            this.leftSlideBar.pause();
            this.topSlideBar.pause();
            this.bottomSlideBar.pause();
            this.rightSlideBar.pause();
            this.background.alpha = 0.5;
            (this.game.sound as SoundManager).gameMusic.pause();

            // Add the buttons
            this.whiteBoard = this.game.add.sprite(0,0,Assets.Images.ImagesWhiteboard.getName());
            this.menuButton = new BouncingButton(this.game, 85, 310, Assets.Images.ImagesWhitehouse.getName());
            this.menuButton.onInputUp.add(() => {
                (this.game.sound as SoundManager).gameMusic.stop();
                (this.game.sound as SoundManager).menuMusic.play();
                this.game.state.start('menu');
            }, this);

            this.settingsButton = new BouncingButton(this.game, 535, 405, Assets.Images.ImagesFries.getName());
            this.settingsButton.onInputUp.add(() => {
                (this.game.sound as SoundManager).gameMusic.stop();
                (this.game.sound as SoundManager).menuMusic.play();
                this.game.state.start('settings');
            }, this);

            this.ResumeButton = new BouncingButton(this.game, 85, 200, Assets.Images.ImagesRepublican.getName());
            this.ResumeButton.onInputUp.add(this.resumeGame, this);

            this.menuButton.scale.setTo(0.27);
            this.settingsButton.scale.setTo(0.25);
            this.ResumeButton.scale.setTo(0.27);

            // Add the texts
            this.resumeText = this.game.add.text(260, 203, 'Resume Game', {font: '48px ' + Assets.CustomWebFonts.FontsAmericanCaptain.getFamily()});
            this.resumeText.anchor.setTo(0.5);
            this.resumeText.addColor('rgb(60,59,110)', 0);

            this.menuText = this.game.add.text(260, 315, 'Back to Menu', {font: '48px ' + Assets.CustomWebFonts.FontsAmericanCaptain.getFamily()});
            this.menuText.anchor.setTo(0.5);
            this.menuText.addColor('rgb(60,59,110)', 0);

            this.settingsText = this.game.add.text(380, 410, 'Settings & Credits', {font: '35px ' + Assets.CustomWebFonts.FontsAmericanCaptain.getFamily()});
            this.settingsText.anchor.setTo(0.5);
            this.settingsText.addColor('rgb(60,59,110)', 0);

        }

    }

// -------------------------------------------------------------------------------

    public resumeGame(): void {
        this.ball.resume();
        this.leftSlideBar.resume();
        this.topSlideBar.resume();
        this.bottomSlideBar.resume();
        this.rightSlideBar.resume();
        this.background.alpha = 1;

        this.whiteBoard.destroy();
        this.menuButton.destroy();
        this.settingsButton.destroy();
        this.ResumeButton.destroy();

       this.resumeText.destroy();
       this.settingsText.destroy();
       this.menuText.destroy();

       (this.game.sound as SoundManager).gameMusic.resume();

        this.gamePaused = false;
        this.gameLoop();
    }

// -------------------------------------------------------------------------------

}