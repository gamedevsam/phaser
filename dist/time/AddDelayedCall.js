import './NOOP.js';
import { AddTimer } from './AddTimer.js';

function AddDelayedCall(world, delay, callback) {
    AddTimer(world, {
        duration: 0,
        delay,
        onComplete: callback
    });
}

export { AddDelayedCall };
