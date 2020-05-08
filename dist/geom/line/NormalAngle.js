import { MATH_CONST } from '../../math/const.js';
import { Wrap } from '../../math/Wrap.js';
import { Angle } from './Angle.js';

function NormalAngle(line) {
    const angle = Angle(line) - MATH_CONST.HALF_PI;
    return Wrap(angle, -Math.PI, Math.PI);
}

export { NormalAngle };
