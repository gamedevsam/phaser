import { Matrix2D } from '../matrix2d/Matrix2D.js';
import { Rotate } from './Rotate.js';

function FromRotation(angle) {
    return Rotate(new Matrix2D(), angle);
}

export { FromRotation };
