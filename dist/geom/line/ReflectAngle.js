import '../../math/const.js';
import '../../math/Wrap.js';
import { Angle } from './Angle.js';
import { NormalAngle } from './NormalAngle.js';

function ReflectAngle(lineA, lineB) {
    return (2 * NormalAngle(lineB) - Math.PI - Angle(lineA));
}

export { ReflectAngle };
