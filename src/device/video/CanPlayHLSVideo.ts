import { CanPlayVideoType } from './CanPlayVideoType';

export function CanPlayHLSVideo (videoElement?: HTMLVideoElement): boolean
{
    return CanPlayVideoType('application/x-mpegURL; codecs="avc1.42E01E"', videoElement);
}
