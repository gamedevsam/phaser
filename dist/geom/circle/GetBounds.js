import '../rectangle/Contains.js';
import { Rectangle } from '../rectangle/Rectangle.js';

function GetBounds(circle, out = new Rectangle()) {
    return out.set(circle.left, circle.top, circle.diameter, circle.diameter);
}

export { GetBounds };
