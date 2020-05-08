import { CanPlayVideoType } from './CanPlayVideoType.js';

function CanPlayVP9Video(videoElement) {
    return CanPlayVideoType('video/webm; codecs="vp9"', videoElement);
}

export { CanPlayVP9Video };
