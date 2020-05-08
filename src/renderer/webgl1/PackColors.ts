import { ISprite } from '../../gameobjects/sprite/ISprite';
import { PackColor } from './PackColor';

export function PackColors <T extends ISprite> (sprite: T): T
{
    const alpha = sprite.vertexAlpha;
    const tint = sprite.vertexTint;
    const color = sprite.vertexColor;

    //  In lots of cases, this *never* changes, so cache it here:
    color[0] = PackColor(tint[0], alpha[0]);
    color[1] = PackColor(tint[1], alpha[1]);
    color[2] = PackColor(tint[2], alpha[2]);
    color[3] = PackColor(tint[3], alpha[3]);

    return sprite;
}
