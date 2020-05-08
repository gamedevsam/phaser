import { Vec2 } from '../../math/vec2/Vec2.js';

function Random(rect, out = new Vec2()) {
    return out.set(rect.x + (Math.random() * rect.width), rect.y + (Math.random() * rect.height));
}

export { Random };
