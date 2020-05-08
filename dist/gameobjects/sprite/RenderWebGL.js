import { UploadBuffers } from './UploadBuffers.js';

function RenderWebGL(sprite, renderer, shader, startActiveTexture) {
    const texture = sprite.texture;
    if (texture.glIndexCounter < startActiveTexture) {
        renderer.requestTexture(texture);
    }
    if (shader.count === shader.batchSize) {
        shader.flush();
    }
    UploadBuffers(sprite, shader.vertexViewF32, shader.vertexViewU32, shader.count * shader.quadElementSize);
    shader.count++;
}

export { RenderWebGL };
