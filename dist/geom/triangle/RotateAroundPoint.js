import { RotateAroundXY } from './RotateAroundXY.js';

function RotateAroundPoint(triangle, point, angle) {
    return RotateAroundXY(triangle, point.x, point.y, angle);
}

export { RotateAroundPoint };
