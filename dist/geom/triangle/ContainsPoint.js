import { Contains } from './Contains.js';

function ContainsPoint(triangle, point) {
    return Contains(triangle, point.x, point.y);
}

export { ContainsPoint };
