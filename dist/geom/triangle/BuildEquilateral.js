import './Contains.js';
import { Triangle } from './Triangle.js';

function BuildEquilateral(x, y, length) {
    const height = length * (Math.sqrt(3) / 2);
    const x1 = x;
    const y1 = y;
    const x2 = x + (length / 2);
    const y2 = y + height;
    const x3 = x - (length / 2);
    const y3 = y + height;
    return new Triangle(x1, y1, x2, y2, x3, y3);
}

export { BuildEquilateral };
