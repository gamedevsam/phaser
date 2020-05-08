import { Vec2 } from '../../math/vec2/Vec2.js';

function Random(ellipse, out = new Vec2()) {
    const p = Math.random() * Math.PI * 2;
    const s = Math.sqrt(Math.random());
    out.x = ellipse.x + ((s * Math.cos(p)) * ellipse.width / 2);
    out.y = ellipse.y + ((s * Math.sin(p)) * ellipse.height / 2);
    return out;
}

export { Random };
