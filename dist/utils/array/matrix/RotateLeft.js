import './CheckMatrix.js';
import './TransposeMatrix.js';
import { RotateMatrix } from './RotateMatrix.js';

function RotateLeft(matrix) {
    return RotateMatrix(matrix, 90);
}

export { RotateLeft };
