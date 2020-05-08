import { Matrix2D } from '../matrix2d/Matrix2D.js';

function MultiplyScalarAndAdd(a, b, scale) {
    return new Matrix2D(a.a + (b.a * scale), a.b + (b.b * scale), a.c + (b.c * scale), a.d + (b.d * scale), a.tx + (b.tx * scale), a.ty + (b.ty * scale));
}

export { MultiplyScalarAndAdd };
