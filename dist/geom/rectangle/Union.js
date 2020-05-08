import './Contains.js';
import { Rectangle } from './Rectangle.js';

function Union(rectA, rectB, out = new Rectangle()) {
    const x = Math.min(rectA.x, rectB.x);
    const y = Math.min(rectA.y, rectB.y);
    const w = Math.max(rectA.right, rectB.right) - x;
    const h = Math.max(rectA.bottom, rectB.bottom) - y;
    return out.set(x, y, w, h);
}

export { Union };
