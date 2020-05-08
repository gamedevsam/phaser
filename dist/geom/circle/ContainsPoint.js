import { Contains } from './Contains.js';

function ContainsPoint(circle, point) {
    return Contains(circle, point.x, point.y);
}

export { ContainsPoint };
