import '../circle/Contains.js';
import '../../math/vec2/Vec2.js';
import '../line/Line.js';
import { LineToCircle } from './LineToCircle.js';
import { GetEdges } from '../triangle/GetEdges.js';
import { Contains } from '../triangle/Contains.js';

function TriangleToCircle(triangle, circle) {
    if (triangle.left > circle.right ||
        triangle.right < circle.left ||
        triangle.top > circle.bottom ||
        triangle.bottom < circle.top) {
        return false;
    }
    if (Contains(triangle, circle.x, circle.y)) {
        return true;
    }
    const [line1, line2, line3] = GetEdges(triangle);
    return (LineToCircle(line1, circle) ||
        LineToCircle(line2, circle) ||
        LineToCircle(line3, circle));
}

export { TriangleToCircle };
