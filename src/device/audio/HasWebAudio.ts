export function HasWebAudio (): boolean
{
    return (
        window &&
        (window.hasOwnProperty('AudioContext') || window.hasOwnProperty('webkitAudioContext'))
    );
}
