import Filter from "./filters/Filter";
import SoundContext from "./SoundContext";
import SoundInstance from "./SoundInstance";
import SoundNodes from "./SoundNodes";
import SoundSprite from "./SoundSprite";
import { SoundSpriteData } from "./SoundSprite";
export interface Options {
    autoPlay?: boolean;
    preaload?: boolean;
    singleInstance?: boolean;
    volume?: number;
    speed?: number;
    complete?: CompleteCallback;
    loaded?: LoadedCallback;
    preload?: boolean;
    loop?: boolean;
    src?: string;
    srcBuffer?: ArrayBuffer;
    useXHR?: boolean;
    sprites?: {
        [id: string]: SoundSpriteData;
    };
}
export declare type SoundSprites = {
    [id: string]: SoundSprite;
};
export interface PlayOptions {
    start?: number;
    end?: number;
    speed?: number;
    loop?: boolean;
    fadeIn?: number;
    fadeOut?: number;
    sprite?: string;
    complete?: CompleteCallback;
    loaded?: LoadedCallback;
}
export declare type LoadedCallback = (err: Error, sound?: Sound, instance?: SoundInstance) => void;
export declare type CompleteCallback = (sound: Sound) => void;
export default class Sound {
    isLoaded: boolean;
    isPlaying: boolean;
    autoPlay: boolean;
    singleInstance: boolean;
    preload: boolean;
    src: string;
    srcBuffer: ArrayBuffer;
    useXHR: boolean;
    private _autoPlayOptions;
    private _volume;
    private _sprites;
    private _context;
    private _nodes;
    private _source;
    private _instances;
    static from(options: string | Options | ArrayBuffer): Sound;
    constructor(context: SoundContext, source: string | Options | ArrayBuffer);
    destroy(): void;
    readonly isPlayable: boolean;
    readonly context: SoundContext;
    volume: number;
    loop: boolean;
    buffer: AudioBuffer;
    readonly duration: number;
    readonly nodes: SoundNodes;
    filters: Filter[];
    speed: number;
    readonly instances: SoundInstance[];
    readonly sprites: SoundSprites;
    addSprites(alias: string, data: SoundSpriteData): SoundSprite;
    addSprites(sprites: {
        [id: string]: SoundSpriteData;
    }): SoundSprites;
    removeSprites(alias?: string): Sound;
    play(alias: string, callback?: CompleteCallback): SoundInstance | Promise<SoundInstance>;
    play(source?: PlayOptions | CompleteCallback, callback?: CompleteCallback): SoundInstance | Promise<SoundInstance>;
    stop(): Sound;
    pause(): Sound;
    resume(): Sound;
    private _beginPreload(callback?);
    private _onComplete(instance);
    private _removeInstances();
    private _loadUrl(callback?);
    private _loadPath(callback?);
    private _decode(arrayBuffer, callback?);
}
