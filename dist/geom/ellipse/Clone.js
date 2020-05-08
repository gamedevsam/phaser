import './Contains.js';
import { Ellipse } from './Ellipse.js';

function Clone(source) {
    return new Ellipse(source.x, source.y, source.width, source.height);
}

export { Clone };
