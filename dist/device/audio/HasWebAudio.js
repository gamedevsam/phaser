function HasWebAudio() {
    return (window &&
        (window.hasOwnProperty('AudioContext') || window.hasOwnProperty('webkitAudioContext')));
}

export { HasWebAudio };
