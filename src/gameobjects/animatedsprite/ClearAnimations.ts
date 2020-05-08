import { IAnimatedSprite } from './IAnimatedSprite';

export function ClearAnimations <T extends IAnimatedSprite> (...sprites: T[]): T[]
{
    sprites.forEach(sprite =>
    {
        sprite.anims.clear();
    });

    return sprites;
}
