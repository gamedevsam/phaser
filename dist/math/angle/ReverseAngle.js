import '../const.js';
import { NormalizeAngle } from './NormalizeAngle.js';

function ReverseAngle(angle) {
    return NormalizeAngle(angle + Math.PI);
}

export { ReverseAngle };
