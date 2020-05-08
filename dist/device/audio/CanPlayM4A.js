import { CanPlayAudioType } from './CanPlayAudioType.js';

function CanPlayM4A(audioElement) {
    return (CanPlayAudioType('audio/x-m4a', audioElement) ||
        CanPlayAudioType('audio/aac', audioElement));
}

export { CanPlayM4A };
