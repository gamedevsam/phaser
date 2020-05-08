import { Matrix2D } from '../matrix2d/Matrix2D';
import { Scale } from './Scale';

export function FromScaling (scaleX: number, scaleY: number = scaleX): Matrix2D
{
    return Scale(new Matrix2D(), scaleX, scaleY);
}
