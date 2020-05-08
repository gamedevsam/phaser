import './CheckMatrix.js';
import './TransposeMatrix.js';
import { RotateMatrix } from './RotateMatrix.js';

function Rotate180(matrix) {
    return RotateMatrix(matrix, 180);
}

export { Rotate180 };
