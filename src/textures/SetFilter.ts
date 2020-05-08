import { Texture } from './Texture';

export function SetFilter (linear: boolean, ...textures: Texture[]): Texture[]
{
    textures.forEach(texture =>
    {
        if (texture.binding)
        {
            texture.binding.setFilter(linear);
        }
    });

    return textures;
}
