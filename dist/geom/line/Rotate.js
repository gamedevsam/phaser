import { RotateAroundXY } from './RotateAroundXY.js';

function Rotate(line, angle) {
    const x = (line.x1 + line.x2) / 2;
    const y = (line.y1 + line.y2) / 2;
    return RotateAroundXY(line, x, y, angle);
}

export { Rotate };
