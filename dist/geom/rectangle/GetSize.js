import { Vec2 } from '../../math/vec2/Vec2.js';

function GetSize(rect, out = new Vec2()) {
    return out.set(rect.width, rect.height);
}

export { GetSize };
