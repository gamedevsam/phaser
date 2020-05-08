import './Contains.js';
import { Rectangle } from './Rectangle.js';

function Clone(source) {
    return new Rectangle(source.x, source.y, source.width, source.height);
}

export { Clone };
