import { SmootherStep } from '../SmootherStep.js';

function SmootherStepInterpolation(t, min, max) {
    return min + (max - min) * SmootherStep(t, 0, 1);
}

export { SmootherStepInterpolation };
