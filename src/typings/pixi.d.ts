declare namespace PIXI {

    export interface SystemRenderer {

        backgroundColor: number;

    }

    export interface WebGLRenderer extends SystemRenderer {

    }

    export interface CanvasRenderer extends SystemRenderer {
        
    }

}