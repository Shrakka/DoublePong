import Filterable from "./Filterable";
import SoundContext from "./SoundContext";
export default class SoundNodes extends Filterable {
    static BUFFER_SIZE: number;
    bufferSource: AudioBufferSourceNode;
    script: ScriptProcessorNode;
    gain: GainNode;
    analyser: AnalyserNode;
    context: SoundContext;
    constructor(context: SoundContext);
    destroy(): void;
    cloneBufferSource(): AudioBufferSourceNode;
}
