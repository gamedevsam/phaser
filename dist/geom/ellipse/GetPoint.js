import { MATH_CONST } from '../../math/const.js';
import { Vec2 } from '../../math/vec2/Vec2.js';
import '../../math/Clamp.js';
import { FromPercent } from '../../math/FromPercent.js';
import { CircumferencePoint } from './CircumferencePoint.js';

function GetPoint(ellipse, position, out = new Vec2()) {
    const angle = FromPercent(position, 0, MATH_CONST.PI2);
    return CircumferencePoint(ellipse, angle, out);
}

export { GetPoint };
