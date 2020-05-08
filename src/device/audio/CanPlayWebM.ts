import { CanPlayAudioType } from './CanPlayAudioType';

export function CanPlayWebM (audioElement?: HTMLAudioElement): boolean
{
    return CanPlayAudioType('audio/webm; codecs="vorbis"', audioElement);
}
