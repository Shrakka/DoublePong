export default class SlideBar extends PIXI.Sprite {

    protected horizontal: boolean;
    protected human: boolean;
    protected speed: number;
    protected acceleration: number;
    protected size:number;

    public left: boolean;
    public right: boolean;
    public up: boolean;
    public down: boolean;

    constructor(x: number, y: number, horizontal: string, human: string, texture: PIXI.Texture){
        super(texture)
        this.position.set(x,y)
        this.horizontal = horizontal === 'horizontal' ? true: false;
        this.human = human === 'human' ? true: false;

        this.setSlideBar();
    }

    public move(): void {        

        if(this.horizontal) {
            if(this.left){
                this.x -= 5;
            }

            if(this.right){
                this.x += 5;
            }

            if(this.up){
                this.y -= 5;
            }

            if(this.down){
                this.y += 5;
            }

        } else { // VERTICAL
            
            if(this.up){
                this.y -= 5;
            }

            if(this.down){
                this.y += 5;
            }
        }
    }

    setSlideBar(): void {

        this._anchor.set(0.5, 0.5);
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        if(!this.horizontal) {
            this.rotation = Math.PI/2;
        }

    }


}