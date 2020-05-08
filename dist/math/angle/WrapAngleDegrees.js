import { Wrap } from '../Wrap.js';

function WrapAngleDegrees(angle) {
    return Wrap(angle, -180, 180);
}

export { WrapAngleDegrees };
