import { Vec2 } from '../../math/vec2/Vec2.js';

function Decompose(rect, out = []) {
    out.push(new Vec2(rect.x, rect.y), new Vec2(rect.right, rect.y), new Vec2(rect.right, rect.bottom), new Vec2(rect.x, rect.bottom));
    return out;
}

export { Decompose };
