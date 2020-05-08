function CreateWorldRenderData(camera) {
    return {
        camera,
        gameFrame: 0,
        dirtyFrame: 0,
        numRendered: 0,
        numRenderable: 0,
        renderList: []
    };
}

export { CreateWorldRenderData };
