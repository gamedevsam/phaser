import '../../math/vec2/Vec2.js';
import { InCenter } from './InCenter.js';
import { RotateAroundXY } from './RotateAroundXY.js';

function Rotate(triangle, angle) {
    const point = InCenter(triangle);
    return RotateAroundXY(triangle, point.x, point.y, angle);
}

export { Rotate };
