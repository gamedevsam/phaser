import '../../math/vec2/Vec2.js';
import { Perimeter } from './Perimeter.js';
import { GetPoint } from './GetPoint.js';

function GetPoints(rectangle, step, quantity = 0, out = []) {
    if (!quantity) {
        quantity = Perimeter(rectangle) / step;
    }
    for (let i = 0; i < quantity; i++) {
        out.push(GetPoint(rectangle, i / quantity));
    }
    return out;
}

export { GetPoints };
