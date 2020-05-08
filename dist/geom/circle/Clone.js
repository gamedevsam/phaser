import './Contains.js';
import { Circle } from './Circle.js';

function Clone(source) {
    return new Circle(source.x, source.y, source.radius);
}

export { Clone };
