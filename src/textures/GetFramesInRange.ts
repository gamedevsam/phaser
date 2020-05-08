import { Frame } from './Frame';
import { ITexture } from './ITexture';

export type GetFramesInRangeConfig =
{
    prefix?: string;
    start?: number;
    end: number;
    zeroPad?: number;
    suffix?: string;
};

export function GetFramesInRange (texture: ITexture, config: GetFramesInRangeConfig): Frame[]
{
    const {
        prefix = '',
        start = 0,
        zeroPad = 0,
        suffix = ''
    } = config;

    let end = config.end;

    const output: Frame[] = [];

    const diff: number = (start < end) ? 1 : -1;

    //  Adjust because we use i !== end in the for loop
    end += diff;

    for (let i: number = start; i !== end; i += diff)
    {
        const frameKey = (prefix + i.toString().padStart(zeroPad, '0') + suffix);

        output.push(texture.getFrame(frameKey));
    }

    return output;
}
