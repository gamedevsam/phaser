import { MATH_CONST } from '../const.js';

function CounterClockwise(angle) {
    if (angle > Math.PI) {
        angle -= MATH_CONST.PI2;
    }
    return Math.abs((((angle + MATH_CONST.HALF_PI) % MATH_CONST.PI2) - MATH_CONST.PI2) % MATH_CONST.PI2);
}

export { CounterClockwise };
