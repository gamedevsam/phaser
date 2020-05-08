import { Vec2 } from '../../math/vec2/Vec2.js';

function Random(circle, out = new Vec2()) {
    const t = 2 * Math.PI * Math.random();
    const u = Math.random() + Math.random();
    const r = (u > 1) ? 2 - u : u;
    const x = r * Math.cos(t);
    const y = r * Math.sin(t);
    return out.set(circle.x + (x * circle.radius), circle.y + (y * circle.radius));
}

export { Random };
