import { MATH_CONST } from '../const.js';

function NormalizeAngle(angle) {
    angle = angle % MATH_CONST.PI2;
    if (angle >= 0) {
        return angle;
    }
    else {
        return angle + MATH_CONST.PI2;
    }
}

export { NormalizeAngle };
