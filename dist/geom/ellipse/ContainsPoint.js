import { Contains } from './Contains.js';

function ContainsPoint(ellipse, point) {
    return Contains(ellipse, point.x, point.y);
}

export { ContainsPoint };
