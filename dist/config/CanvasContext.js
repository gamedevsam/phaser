let _contextAttributes = {
    alpha: false,
    desynchronized: false
};
function CanvasContext(contextAttributes) {
    return () => {
        _contextAttributes = contextAttributes;
    };
}
function GetCanvasContext() {
    return _contextAttributes;
}

export { CanvasContext, GetCanvasContext };
