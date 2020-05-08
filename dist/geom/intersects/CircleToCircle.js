import { DistanceBetween } from '../../math/distance/DistanceBetween.js';

function CircleToCircle(circleA, circleB) {
    return (DistanceBetween(circleA.x, circleA.y, circleB.x, circleB.y) <= (circleA.radius + circleB.radius));
}

export { CircleToCircle };
