import { SmoothStep } from '../SmoothStep.js';

function SmoothStepInterpolation(t, min, max) {
    return min + (max - min) * SmoothStep(t, 0, 1);
}

export { SmoothStepInterpolation };
