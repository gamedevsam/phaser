let _scenes = [];
function Scenes(scenes) {
    return () => {
        _scenes = [].concat(scenes);
    };
}
function GetScenes() {
    return _scenes;
}

export { GetScenes, Scenes };
