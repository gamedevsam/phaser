import { Frame } from './Frame';
import { ITexture } from './ITexture';

export function GetFrames (texture: ITexture, frames: string[] | number[]): Frame[]
{
    const output: Frame[] = [];

    frames.forEach((key: string | number) =>
    {
        output.push(texture.getFrame(key));
    });

    return output;
}
