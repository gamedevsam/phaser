import { Vec2 } from '../../math/vec2/Vec2.js';

function GetMidPoint(line, out = new Vec2()) {
    out.x = (line.x1 + line.x2) / 2;
    out.y = (line.y1 + line.y2) / 2;
    return out;
}

export { GetMidPoint };
