export function HasAudio (): boolean
{
    return (window && window.hasOwnProperty('Audio'));
}
