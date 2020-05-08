import { Vec2 } from '../../math/vec2/Vec2.js';
import { Perimeter } from './Perimeter.js';

function MarchingAnts(rect, step, quantity, out = []) {
    if (!step && !quantity) {
        return out;
    }
    if (!step) {
        step = Perimeter(rect) / quantity;
    }
    else {
        quantity = Math.round(Perimeter(rect) / step);
    }
    let x = rect.x;
    let y = rect.y;
    let face = 0;
    for (let i = 0; i < quantity; i++) {
        out.push(new Vec2(x, y));
        switch (face) {
            case 0:
                x += step;
                if (x >= rect.right) {
                    face = 1;
                    y += (x - rect.right);
                    x = rect.right;
                }
                break;
            case 1:
                y += step;
                if (y >= rect.bottom) {
                    face = 2;
                    x -= (y - rect.bottom);
                    y = rect.bottom;
                }
                break;
            case 2:
                x -= step;
                if (x <= rect.x) {
                    face = 3;
                    y -= (rect.x - x);
                    x = rect.x;
                }
                break;
            case 3:
                y -= step;
                if (y <= rect.y) {
                    face = 0;
                    y = rect.y;
                }
                break;
        }
    }
    return out;
}

export { MarchingAnts };
