import { Vec2 } from '../../math/vec2/Vec2.js';
import { Perimeter } from './Perimeter.js';

function GetPoint(rectangle, position, out = new Vec2()) {
    if (position <= 0 || position >= 1) {
        return out.set(rectangle.x, rectangle.y);
    }
    let p = Perimeter(rectangle) * position;
    if (position > 0.5) {
        p -= (rectangle.width + rectangle.height);
        if (p <= rectangle.width) {
            return out.set(rectangle.right - p, rectangle.bottom);
        }
        else {
            return out.set(rectangle.x, rectangle.bottom - (p - rectangle.width));
        }
    }
    else if (p <= rectangle.width) {
        return out.set(rectangle.x + p, rectangle.y);
    }
    else {
        return out.set(rectangle.right, rectangle.y + (p - rectangle.width));
    }
}

export { GetPoint };
