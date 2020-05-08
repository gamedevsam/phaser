import { CanPlayAudioType } from './CanPlayAudioType';

export function CanPlayWAV (audioElement?: HTMLAudioElement): boolean
{
    return CanPlayAudioType('audio/wav; codecs="1"', audioElement);
}
