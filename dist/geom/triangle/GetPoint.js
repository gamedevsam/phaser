import { Vec2 } from '../../math/vec2/Vec2.js';
import '../line/Line.js';
import { GetEdges } from './GetEdges.js';
import { Length } from '../line/Length.js';

function GetPoint(triangle, position, out = new Vec2()) {
    const [line1, line2, line3] = GetEdges(triangle);
    if (position <= 0 || position >= 1) {
        return out.set(line1.x1, line1.y1);
    }
    const length1 = Length(line1);
    const length2 = Length(line2);
    const length3 = Length(line3);
    const perimeter = length1 + length2 + length3;
    let p = perimeter * position;
    let localPosition = 0;
    if (p < length1) {
        localPosition = p / length1;
        const { x1, y1, x2, y2 } = line1;
        return out.set(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
    }
    else if (p > length1 + length2) {
        p -= length1 + length2;
        localPosition = p / length3;
        const { x1, y1, x2, y2 } = line3;
        return out.set(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
    }
    else {
        p -= length1;
        localPosition = p / length2;
        const { x1, y1, x2, y2 } = line2;
        return out.set(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
    }
}

export { GetPoint };
