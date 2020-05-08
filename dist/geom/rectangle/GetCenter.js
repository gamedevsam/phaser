import { Vec2 } from '../../math/vec2/Vec2.js';
import { CenterX } from './CenterX.js';
import { CenterY } from './CenterY.js';

function GetCenter(rect, out = new Vec2()) {
    return out.set(CenterX(rect), CenterY(rect));
}

export { GetCenter };
