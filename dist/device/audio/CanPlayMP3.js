import { CanPlayAudioType } from './CanPlayAudioType.js';

function CanPlayMP3(audioElement) {
    return CanPlayAudioType('audio/mpeg; codecs="mp3"', audioElement);
}

export { CanPlayMP3 };
