import { Vec2 } from '../../math/vec2/Vec2.js';

function Decompose(triangle, out = []) {
    const { x1, y1, x2, y2, x3, y3 } = triangle;
    out.push(new Vec2(x1, y1), new Vec2(x2, y2), new Vec2(x3, y3));
    return out;
}

export { Decompose };
