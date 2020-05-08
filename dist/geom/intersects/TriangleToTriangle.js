import '../../math/vec2/Vec2.js';
import '../line/Line.js';
import { LineToLine } from './LineToLine.js';
import { GetEdges } from '../triangle/GetEdges.js';
import '../triangle/Contains.js';
import { ContainsArray } from '../triangle/ContainsArray.js';
import { Decompose } from '../triangle/Decompose.js';

function TriangleToTriangle(triangleA, triangleB) {
    if (triangleA.left > triangleB.right ||
        triangleA.right < triangleB.left ||
        triangleA.top > triangleB.bottom ||
        triangleA.bottom < triangleB.top) {
        return false;
    }
    const [lineAA, lineAB, lineAC] = GetEdges(triangleA);
    const [lineBA, lineBB, lineBC] = GetEdges(triangleB);
    if (LineToLine(lineAA, lineBA) ||
        LineToLine(lineAA, lineBB) ||
        LineToLine(lineAA, lineBC) ||
        LineToLine(lineAB, lineBA) ||
        LineToLine(lineAB, lineBB) ||
        LineToLine(lineAB, lineBC) ||
        LineToLine(lineAC, lineBA) ||
        LineToLine(lineAC, lineBB) ||
        LineToLine(lineAC, lineBC)) {
        return true;
    }
    const withinA = ContainsArray(triangleB, Decompose(triangleA), true);
    if (withinA.length > 0) {
        return true;
    }
    const withinB = ContainsArray(triangleA, Decompose(triangleB), true);
    return (withinB.length > 0);
}

export { TriangleToTriangle };
