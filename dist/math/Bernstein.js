import { Factorial } from './Factorial.js';

function Bernstein(n, i) {
    return Factorial(n) / Factorial(i) / Factorial(n - i);
}

export { Bernstein };
