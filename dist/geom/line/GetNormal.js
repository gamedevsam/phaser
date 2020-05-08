import { MATH_CONST } from '../../math/const.js';
import { Vec2 } from '../../math/vec2/Vec2.js';
import { Angle } from './Angle.js';

function GetNormal(line, out = new Vec2()) {
    const a = Angle(line) - MATH_CONST.HALF_PI;
    out.x = Math.cos(a);
    out.y = Math.sin(a);
    return out;
}

export { GetNormal };
