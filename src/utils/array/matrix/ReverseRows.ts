/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Reverses the rows in the given Array Matrix.
 */
export function ReverseRows (matrix: unknown[][]): unknown[][]
{
    for (let i = 0; i < matrix.length; i++)
    {
        matrix[i].reverse();
    }

    return matrix;
}
