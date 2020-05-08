import { Wrap } from '../Wrap.js';

function WrapAngle(angle) {
    return Wrap(angle, -Math.PI, Math.PI);
}

export { WrapAngle };
