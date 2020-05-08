import { Matrix2D } from '../matrix2d/Matrix2D.js';

function Translate(src, x, y) {
    const { a, b, c, d, tx, ty } = src;
    const dtx = a * x + c * y + tx;
    const dty = b * x + d * y + ty;
    return new Matrix2D(1, 0, 0, 1, dtx, dty);
}

export { Translate };
