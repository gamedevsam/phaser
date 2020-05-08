import { Matrix2D } from '../matrix2d/Matrix2D.js';

function Rotate(src, angle) {
    const { a, b, c, d } = src;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    return new Matrix2D(a * cos + c * sin, b * cos + d * sin, a * -sin + c * cos, b * -sin + d * cos);
}

export { Rotate };
