import { CanPlayVideoType } from './CanPlayVideoType.js';

function CanPlayWebMVideo(videoElement) {
    return CanPlayVideoType('video/webm; codecs="vp8, vorbis"', videoElement);
}

export { CanPlayWebMVideo };
