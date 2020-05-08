import { MATH_CONST } from '../../math/const.js';
import { Angle } from './Angle.js';

function NormalX(line) {
    return Math.cos(Angle(line) - MATH_CONST.HALF_PI);
}

export { NormalX };
