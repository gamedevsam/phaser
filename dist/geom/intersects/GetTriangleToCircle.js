import '../circle/Contains.js';
import '../../math/vec2/Vec2.js';
import '../line/Line.js';
import './LineToCircle.js';
import { GetLineToCircle } from './GetLineToCircle.js';
import { GetEdges } from '../triangle/GetEdges.js';
import '../triangle/Contains.js';
import { TriangleToCircle } from './TriangleToCircle.js';

function GetTriangleToCircle(triangle, circle, out = []) {
    if (TriangleToCircle(triangle, circle)) {
        const [lineA, lineB, lineC] = GetEdges(triangle);
        GetLineToCircle(lineA, circle, out);
        GetLineToCircle(lineB, circle, out);
        GetLineToCircle(lineC, circle, out);
    }
    return out;
}

export { GetTriangleToCircle };
