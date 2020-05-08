function UploadBuffers(sprite, F32, U32, offset, setTexture = true) {
    if (sprite.dirty.render) {
        sprite.updateVertices();
    }
    const data = sprite.vertexData;
    const textureIndex = sprite.texture.glIndex;
    if (setTexture && textureIndex !== sprite.prevTextureID) {
        sprite.prevTextureID = textureIndex;
        data[4] = textureIndex;
        data[10] = textureIndex;
        data[16] = textureIndex;
        data[22] = textureIndex;
    }
    F32.set(data, offset);
    const color = sprite.vertexColor;
    U32[offset + 5] = color[0];
    U32[offset + 11] = color[2];
    U32[offset + 17] = color[3];
    U32[offset + 23] = color[1];
}

export { UploadBuffers };
