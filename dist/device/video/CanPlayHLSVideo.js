import { CanPlayVideoType } from './CanPlayVideoType.js';

function CanPlayHLSVideo(videoElement) {
    return CanPlayVideoType('application/x-mpegURL; codecs="avc1.42E01E"', videoElement);
}

export { CanPlayHLSVideo };
