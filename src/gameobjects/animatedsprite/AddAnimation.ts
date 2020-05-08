import { GetFrames } from '../../textures/GetFrames';
import { IAnimatedSprite } from './IAnimatedSprite';

export function AddAnimation <T extends IAnimatedSprite> (key: string, frames: string[] | number[], ...sprites: T[]): T[]
{
    sprites.forEach(sprite =>
    {
        if (!sprite.anims.has(key))
        {
            sprite.anims.set(key, GetFrames(sprite.texture, frames));
        }
    });

    return sprites;
}
