import '../../math/distance/DistanceBetween.js';
import { Vec2 } from '../../math/vec2/Vec2.js';
import { CircleToCircle } from './CircleToCircle.js';

function GetCircleToCircle(circleA, circleB, out = []) {
    if (CircleToCircle(circleA, circleB)) {
        const x0 = circleA.x;
        const y0 = circleA.y;
        const r0 = circleA.radius;
        const x1 = circleB.x;
        const y1 = circleB.y;
        const r1 = circleB.radius;
        let coefficientA;
        let coefficientB;
        let coefficientC;
        let lambda;
        let x;
        if (y0 === y1) {
            x = ((r1 * r1) - (r0 * r0) - (x1 * x1) + (x0 * x0)) / (2 * (x0 - x1));
            coefficientA = 1;
            coefficientB = -2 * y1;
            coefficientC = (x1 * x1) + (x * x) - (2 * x1 * x) + (y1 * y1) - (r1 * r1);
            lambda = (coefficientB * coefficientB) - (4 * coefficientA * coefficientC);
            if (lambda === 0) {
                out.push(new Vec2(x, (-coefficientB / (2 * coefficientA))));
            }
            else if (lambda > 0) {
                out.push(new Vec2(x, (-coefficientB + Math.sqrt(lambda)) / (2 * coefficientA)));
                out.push(new Vec2(x, (-coefficientB - Math.sqrt(lambda)) / (2 * coefficientA)));
            }
        }
        else {
            const v1 = (x0 - x1) / (y0 - y1);
            const n = (r1 * r1 - r0 * r0 - x1 * x1 + x0 * x0 - y1 * y1 + y0 * y0) / (2 * (y0 - y1));
            coefficientA = (v1 * v1) + 1;
            coefficientB = (2 * y0 * v1) - (2 * n * v1) - (2 * x0);
            coefficientC = (x0 * x0) + (y0 * y0) + (n * n) - (r0 * r0) - (2 * y0 * n);
            lambda = (coefficientB * coefficientB) - (4 * coefficientA * coefficientC);
            if (lambda === 0) {
                x = (-coefficientB / (2 * coefficientA));
                out.push(new Vec2(x, (n - (x * v1))));
            }
            else if (lambda > 0) {
                x = (-coefficientB + Math.sqrt(lambda)) / (2 * coefficientA);
                out.push(new Vec2(x, (n - (x * v1))));
                x = (-coefficientB - Math.sqrt(lambda)) / (2 * coefficientA);
                out.push(new Vec2(x, (n - (x * v1))));
            }
        }
    }
    return out;
}

export { GetCircleToCircle };
