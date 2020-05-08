import { CanPlayVideoType } from './CanPlayVideoType';

export function CanPlayVP9Video (videoElement?: HTMLVideoElement): boolean
{
    return CanPlayVideoType('video/webm; codecs="vp9"', videoElement);
}
