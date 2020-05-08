import { Vec2 } from './vec2/Vec2.js';

function TransformXY(x, y, positionX, positionY, rotation, scaleX, scaleY, output = new Vec2()) {
    const radianSin = Math.sin(rotation);
    const radianCos = Math.cos(rotation);
    const a = radianCos * scaleX;
    const b = radianSin * scaleX;
    const c = -radianSin * scaleY;
    const d = radianCos * scaleY;
    const id = 1 / ((a * d) + (c * -b));
    output.x = (d * id * x) + (-c * id * y) + (((positionY * c) - (positionX * d)) * id);
    output.y = (a * id * y) + (-b * id * x) + (((-positionY * a) + (positionX * b)) * id);
    return output;
}

export { TransformXY };
