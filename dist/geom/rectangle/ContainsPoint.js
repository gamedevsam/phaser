import { Contains } from './Contains.js';

function ContainsPoint(rect, point) {
    return Contains(rect, point.x, point.y);
}

export { ContainsPoint };
