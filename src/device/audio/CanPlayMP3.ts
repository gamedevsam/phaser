import { CanPlayAudioType } from './CanPlayAudioType';

export function CanPlayMP3 (audioElement?: HTMLAudioElement): boolean
{
    return CanPlayAudioType('audio/mpeg; codecs="mp3"', audioElement);
}
