import { Vec2 } from '../../math/vec2/Vec2.js';
import { Contains } from './Contains.js';

function ContainsArray(triangle, points, returnFirst = false, out = []) {
    let skip = false;
    points.forEach(point => {
        if (skip) {
            return;
        }
        const { x, y } = point;
        if (Contains(triangle, x, y)) {
            out.push(new Vec2(x, y));
            if (returnFirst) {
                skip = true;
            }
        }
    });
    return out;
}

export { ContainsArray };
