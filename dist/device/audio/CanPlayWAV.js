import { CanPlayAudioType } from './CanPlayAudioType.js';

function CanPlayWAV(audioElement) {
    return CanPlayAudioType('audio/wav; codecs="1"', audioElement);
}

export { CanPlayWAV };
