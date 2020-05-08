import '../rectangle/Contains.js';
import { Rectangle } from '../rectangle/Rectangle.js';
import { RectangleToRectangle } from './RectangleToRectangle.js';

function GetRectangleIntersection(rectA, rectB, out = new Rectangle()) {
    if (RectangleToRectangle(rectA, rectB)) {
        const x = Math.max(rectA.x, rectB.x);
        const y = Math.max(rectA.y, rectB.y);
        return out.set(x, y, Math.min(rectA.right, rectB.right) - x, Math.min(rectA.bottom, rectB.bottom) - y);
    }
}

export { GetRectangleIntersection };
