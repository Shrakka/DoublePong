import SlideBar from './SlideBar'
import Ball from './Ball'

export default class AISlideBar extends SlideBar{

    public ball: Ball;

    constructor(x: number, y: number, horizontal: string, human: string, texture: PIXI.Texture, ball: Ball){
        super(x,y, horizontal, human, texture);
        this.ball = ball;
    }

    public move(): void{
        
        if(this.horizontal){ // UPPER BAR
            if(this.ball.x > this.position.x) {
                this.position.x += 1;
            }
            
            if(this.ball.x < this.position.x) {
                this.position.x -= 1;
            }
        } 
       else {

        if(this.ball.y > this.position.y) {
                this.position.y += 1;
            }
            
            if(this.ball.y < this.position.y) {
                this.position.y -= 1;
            }

       }

    }

}