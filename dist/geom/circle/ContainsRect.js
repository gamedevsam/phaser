import { Contains } from './Contains.js';

function ContainsRect(circle, rect) {
    return (Contains(circle, rect.x, rect.y) &&
        Contains(circle, rect.right, rect.y) &&
        Contains(circle, rect.x, rect.bottom) &&
        Contains(circle, rect.right, rect.bottom));
}

export { ContainsRect };
