import Sound from "./Sound";
export interface RenderOptions {
    width?: number;
    height?: number;
    fill?: string | CanvasPattern | CanvasGradient;
}
export default class SoundUtils {
    static sineTone(hertz?: number, seconds?: number): Sound;
    static render(sound: Sound, options?: RenderOptions): PIXI.BaseTexture;
    static playOnce(src: string, callback?: (err?: Error) => void): string;
}
