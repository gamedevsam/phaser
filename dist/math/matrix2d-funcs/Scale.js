import { Matrix2D } from '../matrix2d/Matrix2D.js';

function Scale(src, scaleX, scaleY) {
    return new Matrix2D(src.a * scaleX, src.b * scaleX, src.c * scaleY, src.d * scaleY);
}

export { Scale };
