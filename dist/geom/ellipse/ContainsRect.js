import { Contains } from './Contains.js';

function ContainsRect(ellipse, rect) {
    return (Contains(ellipse, rect.x, rect.y) &&
        Contains(ellipse, rect.right, rect.y) &&
        Contains(ellipse, rect.x, rect.bottom) &&
        Contains(ellipse, rect.right, rect.bottom));
}

export { ContainsRect };
