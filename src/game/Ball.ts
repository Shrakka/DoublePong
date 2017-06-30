export default class Ball extends PIXI.Sprite {

    public direction: number;
    public speed: number;

    constructor(texture: PIXI.Texture) {
        super(texture);
        this.setBall();
    }



    public move(): void {        
        this.position.set(this.position.x+ this.speed * Math.cos(this.direction), this.position.y - this.speed * Math.sin(this.direction))
    }

    public setBall(): void {
        this.anchor.set(0.5, 0.5);
        this.position.y = 400;
        this.position.x = 400;
        this.speed = 3;
        this.direction = 3*Math.PI / 2;      
    }

    public getCorners(): PIXI.Point[] {
        var res: PIXI.Point[] = [];
        res.push(new PIXI.Point(this.position.x - this.width / 2, this.position.y - this.height/2));
        res.push(new PIXI.Point(this.position.x + this.width / 2, this.position.y - this.height/2));
        res.push(new PIXI.Point(this.position.x + this.width / 2, this.position.y + this.height/2));
        res.push(new PIXI.Point(this.position.x - this.width / 2, this.position.y + this.height/2));
        
        return res;
    }



}


/*
PIXI.loader.add("../assets/ballsheet.json").load(onAssetsLoaded);

var anim: any;

function onAssetsLoaded() {
    var frames = []
    frames.push(PIXI.Texture.fromFrame('ball0.png'));
    frames.push(PIXI.Texture.fromFrame('ball1.png'));
    frames.push(PIXI.Texture.fromFrame('ball2.png'));
    frames.push(PIXI.Texture.fromFrame('ball3.png'));

    anim = new PIXI.extras.AnimatedSprite(frames);
    anim.anchor.set(0.5,0.5);
    anim.position.set(200,200);
    anim.animationSpeed = 0.5;
    anim.play();   
}

export default anim;
*/