import { Contains } from '../circle/Contains.js';
import { Vec2 } from '../../math/vec2/Vec2.js';

const tmp = new Vec2();
function LineToCircle(line, circle, nearest) {
    if (!nearest) {
        nearest = tmp;
    }
    const { x1, y1, x2, y2 } = line;
    if (Contains(circle, x1, y1)) {
        nearest.set(x1, y1);
        return true;
    }
    if (Contains(circle, x2, y2)) {
        nearest.set(x2, y2);
        return true;
    }
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lcx = circle.x - x1;
    const lcy = circle.y - y1;
    const dLen2 = (dx * dx) + (dy * dy);
    let px = dx;
    let py = dy;
    if (dLen2 > 0) {
        const dp = ((lcx * dx) + (lcy * dy)) / dLen2;
        px *= dp;
        py *= dp;
    }
    nearest.set(x1 + px, y1 + py);
    const pLen2 = (px * px) + (py * py);
    return (pLen2 <= dLen2 &&
        ((px * dx) + (py * dy)) >= 0 &&
        Contains(circle, nearest.x, nearest.y));
}

export { LineToCircle };
