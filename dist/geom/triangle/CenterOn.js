import '../../math/vec2/Vec2.js';
import { Centroid } from './Centroid.js';
import { Offset } from './Offset.js';

function CenterOn(triangle, x, y, centerFunc = Centroid) {
    const center = centerFunc(triangle);
    const diffX = x - center.x;
    const diffY = y - center.y;
    return Offset(triangle, diffX, diffY);
}

export { CenterOn };
