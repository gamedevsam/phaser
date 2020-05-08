import './Contains.js';
import { Rectangle } from './Rectangle.js';
import { MATH_CONST } from '../../math/const.js';

function FromPoints(points, out = new Rectangle()) {
    if (points.length === 0) {
        return out;
    }
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = MATH_CONST.MIN_SAFE_INTEGER;
    let maxY = MATH_CONST.MIN_SAFE_INTEGER;
    for (let i = 0; i < points.length; i++) {
        const px = points[i].x;
        const py = points[i].y;
        minX = Math.min(minX, px);
        minY = Math.min(minY, py);
        maxX = Math.max(maxX, px);
        maxY = Math.max(maxY, py);
    }
    return out.set(minX, minY, maxX - minX, maxY - minY);
}

export { FromPoints };
