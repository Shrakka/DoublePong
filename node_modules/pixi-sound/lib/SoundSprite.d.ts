import Sound from "./Sound";
import { CompleteCallback } from "./Sound";
import SoundInstance from "./SoundInstance";
export interface SoundSpriteData {
    start: number;
    end: number;
    speed?: number;
}
export default class SoundSprite {
    parent: Sound;
    start: number;
    end: number;
    speed: number;
    duration: number;
    constructor(parent: Sound, options: SoundSpriteData);
    play(complete?: CompleteCallback): SoundInstance | Promise<SoundInstance>;
    destroy(): void;
}
