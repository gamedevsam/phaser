let _contextAttributes: CanvasRenderingContext2DSettings = {
    alpha: false,
    desynchronized: false
};

function CanvasContext (contextAttributes: CanvasRenderingContext2DSettings): () => void
{
    return (): void =>
    {
        _contextAttributes = contextAttributes;
    };
}

function GetCanvasContext (): CanvasRenderingContext2DSettings
{
    return _contextAttributes;
}

export {
    CanvasContext,
    GetCanvasContext
};
