/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { CheckMatrix } from './CheckMatrix';
import { TransposeMatrix } from './TransposeMatrix';

/**
 * Rotates the array matrix based on the given rotation value.
 *
 * The value can be given in degrees: 90, -90, 270, -270 or 180,
 * or a string command: `rotateLeft`, `rotateRight` or `rotate180`.
 *
 * Based on the routine from {@link http://jsfiddle.net/MrPolywhirl/NH42z/}.
 */
export function RotateMatrix (matrix: unknown[][], direction: number | string = 90): unknown[][]
{
    if (!CheckMatrix(matrix))
    {
        return matrix;
    }

    if (typeof direction !== 'string')
    {
        direction = ((direction % 360) + 360) % 360;
    }

    if (direction === 90 || direction === -270 || direction === 'rotateLeft')
    {
        matrix = TransposeMatrix(matrix);
        matrix.reverse();
    }
    else if (direction === -90 || direction === 270 || direction === 'rotateRight')
    {
        matrix.reverse();
        matrix = TransposeMatrix(matrix);
    }
    else if (Math.abs(direction as number) === 180 || direction === 'rotate180')
    {
        for (let i = 0; i < matrix.length; i++)
        {
            matrix[i].reverse();
        }

        matrix.reverse();
    }

    return matrix;
}
