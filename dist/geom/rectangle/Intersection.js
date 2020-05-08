import './Contains.js';
import { Rectangle } from './Rectangle.js';
import { RectangleToRectangle } from '../intersects/RectangleToRectangle.js';

function Intersection(rectA, rectB, out = new Rectangle()) {
    if (RectangleToRectangle(rectA, rectB)) {
        out.set(Math.max(rectA.x, rectB.x), Math.max(rectA.y, rectB.y), Math.min(rectA.right, rectB.right) - out.x, Math.min(rectA.bottom, rectB.bottom) - out.y);
    }
    else {
        out.set();
    }
    return out;
}

export { Intersection };
