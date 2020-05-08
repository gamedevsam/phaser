import { CanPlayVideoType } from './CanPlayVideoType.js';

function CanPlayH264Video(videoElement) {
    return CanPlayVideoType('video/mp4; codecs="avc1.42E01E"', videoElement);
}

export { CanPlayH264Video };
