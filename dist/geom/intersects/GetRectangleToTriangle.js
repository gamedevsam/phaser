import '../rectangle/Contains.js';
import '../../math/vec2/Vec2.js';
import '../line/Line.js';
import '../../GetEdges-95a2b4b0.js';
import './LineToLine.js';
import './LineToRectangle.js';
import { GetLineToRectangle } from './GetLineToRectangle.js';
import { GetEdges } from '../triangle/GetEdges.js';
import '../triangle/Contains.js';
import '../triangle/ContainsArray.js';
import '../rectangle/Decompose.js';
import { RectangleToTriangle } from './RectangleToTriangle.js';

function GetRectangleToTriangle(rect, triangle, out = []) {
    if (RectangleToTriangle(rect, triangle)) {
        const [lineA, lineB, lineC] = GetEdges(triangle);
        GetLineToRectangle(lineA, rect, out);
        GetLineToRectangle(lineB, rect, out);
        GetLineToRectangle(lineC, rect, out);
    }
    return out;
}

export { GetRectangleToTriangle };
