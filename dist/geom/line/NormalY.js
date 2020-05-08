import { MATH_CONST } from '../../math/const.js';
import { Angle } from './Angle.js';

function NormalY(line) {
    return Math.sin(Angle(line) - MATH_CONST.HALF_PI);
}

export { NormalY };
