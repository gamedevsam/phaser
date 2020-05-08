import { CanPlayVideoType } from './CanPlayVideoType';

export function CanPlayWebMVideo (videoElement?: HTMLVideoElement): boolean
{
    return CanPlayVideoType('video/webm; codecs="vp8, vorbis"', videoElement);
}
