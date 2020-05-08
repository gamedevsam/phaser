import { RoundAwayFromZero } from '../../math/RoundAwayFromZero.js';

function NumberArrayStep(start, end, step) {
    const result = [];
    const total = Math.max(RoundAwayFromZero((end - start) / (step || 1)), 0);
    for (let i = 0; i < total; i++) {
        result.push(start);
        start += step;
    }
    return result;
}

export { NumberArrayStep };
