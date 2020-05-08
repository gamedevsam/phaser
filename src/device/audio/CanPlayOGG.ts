import { CanPlayAudioType } from './CanPlayAudioType';

export function CanPlayOGG (audioElement?: HTMLAudioElement): boolean
{
    return CanPlayAudioType('audio/ogg; codecs="vorbis"', audioElement);
}
