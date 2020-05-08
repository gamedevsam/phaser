import { PackColor } from './PackColor.js';

function PackColors(sprite) {
    const alpha = sprite.vertexAlpha;
    const tint = sprite.vertexTint;
    const color = sprite.vertexColor;
    color[0] = PackColor(tint[0], alpha[0]);
    color[1] = PackColor(tint[1], alpha[1]);
    color[2] = PackColor(tint[2], alpha[2]);
    color[3] = PackColor(tint[3], alpha[3]);
    sprite.dirty.setRender();
    return sprite;
}

export { PackColors };
