import { CanPlayVideoType } from './CanPlayVideoType';

export function CanPlayOGGVideo (videoElement?: HTMLVideoElement): boolean
{
    return CanPlayVideoType('video/ogg; codecs="theora"', videoElement);
}
