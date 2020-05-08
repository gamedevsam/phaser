import { Frame } from '../../textures/Frame';
import { ISprite } from './ISprite';
import { SetFrame } from './SetFrame';
import { Texture } from '../../textures/Texture';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';

export function SetTexture <T extends ISprite> (key: string | Texture, frame: string | number | Frame, ...children: T[]): T[]
{
    if (!key)
    {
        //  Remove texture from all children
        children.forEach(child =>
        {
            child.texture = null;
            child.frame = null;
            child.hasTexture = false;
        });
    }
    else
    {
        let texture: Texture;

        if (key instanceof Texture)
        {
            texture = key;
        }
        else
        {
            texture = TextureManagerInstance.get().get(key);
        }

        if (!texture)
        {
            console.warn('Invalid Texture key: ' + key);
        }
        else
        {
            children.forEach(child =>
            {
                child.texture = texture;
            });

            SetFrame(texture, frame, ...children);
        }
    }

    return children;
}
