import '../Factorial.js';
import { Bernstein } from '../Bernstein.js';

function BezierInterpolation(v, k) {
    let b = 0;
    const n = v.length - 1;
    for (let i = 0; i <= n; i++) {
        b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * Bernstein(n, i);
    }
    return b;
}

export { BezierInterpolation };
