let _audioElement: HTMLAudioElement;

export function CanPlayAudioType (type: string, audioElement?: HTMLAudioElement): boolean
{
    if (!audioElement)
    {
        if (!_audioElement)
        {
            _audioElement = document.createElement('audio');
        }

        audioElement = _audioElement;
    }

    return (audioElement && audioElement.canPlayType(type) !== '');
}
