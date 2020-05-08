import { IAnimatedSprite } from './IAnimatedSprite';

export function RemoveAnimation <T extends IAnimatedSprite> (key: string, ...sprites: T[]): T[]
{
    sprites.forEach(sprite =>
    {
        sprite.anims.delete(key);
    });

    return sprites;
}
