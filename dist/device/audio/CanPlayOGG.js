import { CanPlayAudioType } from './CanPlayAudioType.js';

function CanPlayOGG(audioElement) {
    return CanPlayAudioType('audio/ogg; codecs="vorbis"', audioElement);
}

export { CanPlayOGG };
