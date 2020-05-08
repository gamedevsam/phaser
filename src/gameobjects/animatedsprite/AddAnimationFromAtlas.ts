import { GetFramesInRange } from '../../textures/GetFramesInRange';
import { IAnimatedSprite } from './IAnimatedSprite';

export type AtlasFrameConfig = {
    key: string;
    prefix?: string;
    start?: number;
    end: number;
    zeroPad?: number;
    suffix?: string;
};

export function AddAnimationFromAtlas <T extends IAnimatedSprite> (config: AtlasFrameConfig, ...sprites: T[]): T[]
{
    const key = config.key;

    sprites.forEach(sprite =>
    {
        if (!sprite.anims.has(key))
        {
            sprite.anims.set(key, GetFramesInRange(sprite.texture, config));
        }
    });

    return sprites;
}
