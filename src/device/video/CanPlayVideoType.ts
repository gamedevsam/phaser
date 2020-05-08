let _videoElement: HTMLVideoElement;

export function CanPlayVideoType (type: string, videoElement?: HTMLVideoElement): boolean
{
    if (!videoElement)
    {
        if (!_videoElement)
        {
            _videoElement = document.createElement('video');
        }

        videoElement = _videoElement;
    }

    return (videoElement && videoElement.canPlayType(type) !== '');
}
