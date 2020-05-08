import { Clamp } from './Clamp.js';

function FromPercent(percent, min, max) {
    percent = Clamp(percent, 0, 1);
    return (max - min) * percent;
}

export { FromPercent };
