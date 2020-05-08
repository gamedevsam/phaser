import '../../math/vec2/Vec2.js';
import '../line/Line.js';
import './LineToLine.js';
import { GetEdges } from '../triangle/GetEdges.js';
import '../triangle/Contains.js';
import '../triangle/ContainsArray.js';
import './TriangleToLine.js';
import { GetTriangleToLine } from './GetTriangleToLine.js';
import '../triangle/Decompose.js';
import { TriangleToTriangle } from './TriangleToTriangle.js';

function GetTriangleToTriangle(triangleA, triangleB, out = []) {
    if (TriangleToTriangle(triangleA, triangleB)) {
        const [lineA, lineB, lineC] = GetEdges(triangleB);
        GetTriangleToLine(triangleA, lineA, out);
        GetTriangleToLine(triangleA, lineB, out);
        GetTriangleToLine(triangleA, lineC, out);
    }
    return out;
}

export { GetTriangleToTriangle };
