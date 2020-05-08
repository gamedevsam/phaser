import { CanPlayAudioType } from './CanPlayAudioType.js';

function CanPlayWebM(audioElement) {
    return CanPlayAudioType('audio/webm; codecs="vorbis"', audioElement);
}

export { CanPlayWebM };
