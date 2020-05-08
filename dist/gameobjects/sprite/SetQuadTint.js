import '../../renderer/webgl1/PackColor.js';
import { PackColors } from '../../renderer/webgl1/PackColors.js';

function SetQuadTint(topLeft, topRight, bottomLeft, bottomRight, ...sprite) {
    sprite.forEach(entity => {
        const tint = entity.vertexTint;
        tint[0] = topLeft;
        tint[1] = topRight;
        tint[2] = bottomLeft;
        tint[3] = bottomRight;
        PackColors(entity);
    });
}

export { SetQuadTint };
