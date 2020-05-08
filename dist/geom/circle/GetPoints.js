import { MATH_CONST } from '../../math/const.js';
import { Circumference } from './Circumference.js';
import '../../math/vec2/Vec2.js';
import { CircumferencePoint } from './CircumferencePoint.js';
import '../../math/Clamp.js';
import { FromPercent } from '../../math/FromPercent.js';

function GetPoints(circle, step, quantity = 0, out = []) {
    if (!quantity) {
        quantity = Circumference(circle) / step;
    }
    for (let i = 0; i < quantity; i++) {
        const angle = FromPercent(i / quantity, 0, MATH_CONST.PI2);
        out.push(CircumferencePoint(circle, angle));
    }
    return out;
}

export { GetPoints };
