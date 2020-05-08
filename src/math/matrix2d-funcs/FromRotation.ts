import { Matrix2D } from '../matrix2d/Matrix2D';
import { Rotate } from './Rotate';

export function FromRotation (angle: number): Matrix2D
{
    return Rotate(new Matrix2D(), angle);
}
