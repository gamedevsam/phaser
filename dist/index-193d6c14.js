import { NOOP } from './time/NOOP.js';
export { NOOP as N } from './time/NOOP.js';
import { AddTimer } from './time/AddTimer.js';
export { AddTimer as a } from './time/AddTimer.js';
import { AddDelayedCall } from './time/AddDelayedCall.js';
export { AddDelayedCall as A } from './time/AddDelayedCall.js';
import { Clock } from './time/Clock.js';
export { Clock as C } from './time/Clock.js';

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AddDelayedCall: AddDelayedCall,
    AddTimer: AddTimer,
    Clock: Clock,
    NOOP: NOOP
});

export { index as i };
