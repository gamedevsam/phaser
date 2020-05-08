import './CheckMatrix.js';
import './TransposeMatrix.js';
import { RotateMatrix } from './RotateMatrix.js';

function RotateRight(matrix) {
    return RotateMatrix(matrix, -90);
}

export { RotateRight };
