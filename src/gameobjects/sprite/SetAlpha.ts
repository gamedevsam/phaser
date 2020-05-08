import { ISprite } from './ISprite';
import { PackColors } from '../../renderer/webgl1/PackColors';

export function SetAlpha <T extends ISprite> (alpha: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        const vertexAlpha = child.vertexAlpha;

        vertexAlpha[0] = alpha;
        vertexAlpha[1] = alpha;
        vertexAlpha[2] = alpha;
        vertexAlpha[3] = alpha;

        PackColors(child);
    });

    return children;
}
