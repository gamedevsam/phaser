import { Matrix2D } from '../matrix2d/Matrix2D.js';

function Clone(src) {
    return new Matrix2D(src.a, src.b, src.c, src.d, src.tx, src.ty);
}

export { Clone };
