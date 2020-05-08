let instance;
function SetRenderer(renderer) {
    instance = renderer;
}
function GetRenderer() {
    return instance;
}

export { GetRenderer, SetRenderer };
