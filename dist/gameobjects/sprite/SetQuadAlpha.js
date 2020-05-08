import '../../renderer/webgl1/PackColor.js';
import { PackColors } from '../../renderer/webgl1/PackColors.js';

function SetQuadAlpha(topLeft, topRight, bottomLeft, bottomRight, ...sprite) {
    sprite.forEach(entity => {
        const alpha = entity.vertexAlpha;
        alpha[0] = topLeft;
        alpha[1] = topRight;
        alpha[2] = bottomLeft;
        alpha[3] = bottomRight;
        PackColors(entity);
    });
}

export { SetQuadAlpha };
