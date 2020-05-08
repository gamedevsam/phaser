import { Contains } from '../rectangle/Contains.js';
import '../../math/vec2/Vec2.js';
import '../line/Line.js';
import { G as GetEdges$1 } from '../../GetEdges-95a2b4b0.js';
import { LineToLine } from './LineToLine.js';
import { GetEdges } from '../triangle/GetEdges.js';
import '../triangle/Contains.js';
import { ContainsArray } from '../triangle/ContainsArray.js';
import { Decompose } from '../rectangle/Decompose.js';

function RectangleToTriangle(rect, triangle) {
    if (triangle.left > rect.right ||
        triangle.right < rect.x ||
        triangle.top > rect.bottom ||
        triangle.bottom < rect.y) {
        return false;
    }
    const [triA, triB, triC] = GetEdges(triangle);
    if (Contains(rect, triA.x1, triA.y1) || Contains(rect, triA.x2, triA.y2)) {
        return true;
    }
    if (Contains(rect, triB.x1, triB.y1) || Contains(rect, triB.x2, triB.y2)) {
        return true;
    }
    if (Contains(rect, triC.x1, triC.y1) || Contains(rect, triC.x2, triC.y2)) {
        return true;
    }
    const [rectA, rectB, rectC, rectD] = GetEdges$1(rect);
    if (LineToLine(triA, rectA) || LineToLine(triA, rectB) || LineToLine(triA, rectC) || LineToLine(triA, rectD)) {
        return true;
    }
    if (LineToLine(triB, rectA) || LineToLine(triB, rectB) || LineToLine(triB, rectC) || LineToLine(triB, rectD)) {
        return true;
    }
    if (LineToLine(triC, rectA) || LineToLine(triC, rectB) || LineToLine(triC, rectC) || LineToLine(triC, rectD)) {
        return true;
    }
    const within = ContainsArray(triangle, Decompose(rect), true);
    return (within.length > 0);
}

export { RectangleToTriangle };
