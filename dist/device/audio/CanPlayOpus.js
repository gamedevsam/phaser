import { CanPlayAudioType } from './CanPlayAudioType.js';

function CanPlayOpus(audioElement) {
    return (CanPlayAudioType('audio/ogg; codecs="opus"', audioElement) ||
        CanPlayAudioType('audio/webm; codecs="opus"', audioElement));
}

export { CanPlayOpus };
