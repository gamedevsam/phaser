import '../../math/const.js';
import { Vec2 } from '../../math/vec2/Vec2.js';
import { CenterX } from './CenterX.js';
import { CenterY } from './CenterY.js';
import { DegToRad } from '../../math/DegToRad.js';

function PerimeterPoint(rectangle, angle, out = new Vec2()) {
    angle = DegToRad(angle);
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    let dx = (c > 0) ? rectangle.width / 2 : rectangle.width / -2;
    let dy = (s > 0) ? rectangle.height / 2 : rectangle.height / -2;
    if (Math.abs(dx * s) < Math.abs(dy * c)) {
        dy = (dx * s) / c;
    }
    else {
        dx = (dy * c) / s;
    }
    return out.set(dx + CenterX(rectangle), dy + CenterY(rectangle));
}

export { PerimeterPoint };
