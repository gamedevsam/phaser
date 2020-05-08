import { CenterOn } from './CenterOn.js';
import { CenterX } from './CenterX.js';
import { CenterY } from './CenterY.js';

function Inflate(rect, x, y) {
    const cx = CenterX(rect);
    const cy = CenterY(rect);
    rect.width = rect.width + (x * 2);
    rect.height = rect.height + (y * 2);
    return CenterOn(rect, cx, cy);
}

export { Inflate };
