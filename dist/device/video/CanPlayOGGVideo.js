import { CanPlayVideoType } from './CanPlayVideoType.js';

function CanPlayOGGVideo(videoElement) {
    return CanPlayVideoType('video/ogg; codecs="theora"', videoElement);
}

export { CanPlayOGGVideo };
