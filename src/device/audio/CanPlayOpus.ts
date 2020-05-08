import { CanPlayAudioType } from './CanPlayAudioType';

export function CanPlayOpus (audioElement?: HTMLAudioElement): boolean
{
    return (
        CanPlayAudioType('audio/ogg; codecs="opus"', audioElement) ||
        CanPlayAudioType('audio/webm; codecs="opus"', audioElement)
    );
}
