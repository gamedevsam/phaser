import { CheckMatrix } from './CheckMatrix.js';
import { TransposeMatrix } from './TransposeMatrix.js';

function RotateMatrix(matrix, direction = 90) {
    if (!CheckMatrix(matrix)) {
        return matrix;
    }
    if (typeof direction !== 'string') {
        direction = ((direction % 360) + 360) % 360;
    }
    if (direction === 90 || direction === -270 || direction === 'rotateLeft') {
        matrix = TransposeMatrix(matrix);
        matrix.reverse();
    }
    else if (direction === -90 || direction === 270 || direction === 'rotateRight') {
        matrix.reverse();
        matrix = TransposeMatrix(matrix);
    }
    else if (Math.abs(direction) === 180 || direction === 'rotate180') {
        for (let i = 0; i < matrix.length; i++) {
            matrix[i].reverse();
        }
        matrix.reverse();
    }
    return matrix;
}

export { RotateMatrix };
