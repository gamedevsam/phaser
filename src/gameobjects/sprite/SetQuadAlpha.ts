import { ISprite } from './ISprite';
import { PackColors } from '../../renderer/webgl1/PackColors';

export function SetQuadAlpha <T extends ISprite> (topLeft: number, topRight: number, bottomLeft: number, bottomRight: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        const alpha = child.vertexAlpha;

        alpha[0] = topLeft;
        alpha[1] = topRight;
        alpha[2] = bottomLeft;
        alpha[3] = bottomRight;

        PackColors(child);
    });

    return children;
}
