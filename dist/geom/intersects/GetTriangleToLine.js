import { Vec2 } from '../../math/vec2/Vec2.js';
import '../line/Line.js';
import { LineToLine } from './LineToLine.js';
import { GetEdges } from '../triangle/GetEdges.js';
import '../triangle/Contains.js';
import { TriangleToLine } from './TriangleToLine.js';

function GetTriangleToLine(triangle, line, out = []) {
    if (TriangleToLine(triangle, line)) {
        const [lineA, lineB, lineC] = GetEdges(triangle);
        const points = [new Vec2(), new Vec2(), new Vec2()];
        const results = [
            LineToLine(lineA, line, points[0]),
            LineToLine(lineB, line, points[1]),
            LineToLine(lineC, line, points[2])
        ];
        for (let i = 0; i < results.length; i++) {
            if (results[i]) {
                out.push(points[i]);
            }
        }
    }
    return out;
}

export { GetTriangleToLine };
