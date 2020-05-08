import './Contains.js';
import { Triangle } from './Triangle.js';

function BuildRight(x, y, width, height = width) {
    const x1 = x;
    const y1 = y;
    const x2 = x;
    const y2 = y - height;
    const x3 = x + width;
    const y3 = y;
    return new Triangle(x1, y1, x2, y2, x3, y3);
}

export { BuildRight };
