import '../line/Line.js';
import { LineToLine } from './LineToLine.js';
import { GetEdges } from '../triangle/GetEdges.js';
import { Contains } from '../triangle/Contains.js';

function TriangleToLine(triangle, line) {
    const { x1, y1, x2, y2 } = line;
    if (Contains(triangle, x1, y1) || Contains(triangle, x2, y2)) {
        return true;
    }
    const [line1, line2, line3] = GetEdges(triangle);
    return (LineToLine(line1, line) ||
        LineToLine(line2, line) ||
        LineToLine(line3, line));
}

export { TriangleToLine };
