import { Vec2 } from '../../math/vec2/Vec2.js';

function GetPoint(line, position, out = new Vec2()) {
    out.x = line.x1 + (line.x2 - line.x1) * position;
    out.y = line.y1 + (line.y2 - line.y1) * position;
    return out;
}

export { GetPoint };
