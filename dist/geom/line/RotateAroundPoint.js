import { RotateAroundXY } from './RotateAroundXY.js';

function RotateAroundPoint(line, point, angle) {
    return RotateAroundXY(line, point.x, point.y, angle);
}

export { RotateAroundPoint };
