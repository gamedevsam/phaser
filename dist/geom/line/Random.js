import { Vec2 } from '../../math/vec2/Vec2.js';

function Random(line, out = new Vec2()) {
    const t = Math.random();
    out.x = line.x1 + t * (line.x2 - line.x1);
    out.y = line.y1 + t * (line.y2 - line.y1);
    return out;
}

export { Random };
