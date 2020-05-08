import { Vec2 } from '../vec2/Vec2.js';

function LocalToGlobal(mat, x, y, outPoint = new Vec2()) {
    const { a, b, c, d, tx, ty } = mat;
    outPoint.x = (a * x) + (c * y) + tx;
    outPoint.y = (b * x) + (d * y) + ty;
    return outPoint;
}

export { LocalToGlobal };
