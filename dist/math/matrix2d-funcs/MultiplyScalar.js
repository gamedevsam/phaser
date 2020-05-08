import { Matrix2D } from '../matrix2d/Matrix2D.js';

function MultiplyScalar(src, scale) {
    return new Matrix2D(src.a * scale, src.b * scale, src.c * scale, src.d * scale, src.tx * scale, src.ty * scale);
}

export { MultiplyScalar };
