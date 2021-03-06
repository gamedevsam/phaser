import { IMatrix2D } from '../matrix2d/IMatrix2D';
import { Matrix2D } from '../matrix2d/Matrix2D';

export function Scale (src: IMatrix2D, scaleX: number, scaleY: number): Matrix2D
{
    return new Matrix2D(
        src.a * scaleX,
        src.b * scaleX,
        src.c * scaleY,
        src.d * scaleY
    );
}
