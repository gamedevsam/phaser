import { ISprite } from './ISprite';
import { PackColors } from '../../renderer/webgl1/PackColors';

export function SetTint <T extends ISprite> (tint: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        const vertexTint = child.vertexTint;

        vertexTint[0] = tint;
        vertexTint[1] = tint;
        vertexTint[2] = tint;
        vertexTint[3] = tint;

        PackColors(child);
    });

    return children;
}
