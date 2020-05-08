import { Matrix2D } from '../matrix2d/Matrix2D.js';
import { Scale } from './Scale.js';

function FromScaling(scaleX, scaleY = scaleX) {
    return Scale(new Matrix2D(), scaleX, scaleY);
}

export { FromScaling };
