import { IMatrix2D } from './IMatrix2D';

//  Apply the identity, translate, rotate, scale and skew operations on the target Matrix then returns it.

export function ITRSS (target: IMatrix2D, x: number, y: number, angle: number = 0, scaleX: number = 1, scaleY: number = 1, skewX: number = 0, skewY: number = 0): IMatrix2D
{
    if (angle === 0)
    {
        return target.set(1, 0, 0, 1, x, y);
    }
    else
    {
        return target.set(
            Math.cos(angle + skewY) * scaleX,
            Math.sin(angle + skewY) * scaleX,
            -Math.sin(angle - skewX) * scaleY,
            Math.cos(angle - skewX) * scaleY,
            x,
            y
        );
    }
}
