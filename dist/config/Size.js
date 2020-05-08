let _width = 800;
let _height = 600;
let _resolution = 1;
function Size(width = 800, height = 600, resolution = 1) {
    if (resolution === 0) {
        resolution = window.devicePixelRatio;
    }
    return () => {
        _width = width;
        _height = height;
        _resolution = resolution;
    };
}
function GetWidth() {
    return _width;
}
function GetHeight() {
    return _height;
}
function GetResolution() {
    return _resolution;
}

export { GetHeight, GetResolution, GetWidth, Size };
