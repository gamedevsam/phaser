import { ISprite } from './ISprite';
import { PackColors } from '../../renderer/webgl1/PackColors';

export function SetQuadTint <T extends ISprite> (topLeft: number, topRight: number, bottomLeft: number, bottomRight: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        const tint = child.vertexTint;

        tint[0] = topLeft;
        tint[1] = topRight;
        tint[2] = bottomLeft;
        tint[3] = bottomRight;

        PackColors(child);
    });

    return children;
}
