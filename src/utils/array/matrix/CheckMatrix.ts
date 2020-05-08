/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Checks if an array can be used as a matrix.
 *
 * A matrix is a two-dimensional array (array of arrays), where all sub-arrays (rows) have the same length. There must be at least two rows:
 *
 * ```
 *    [
 *        [ 1, 1, 1, 1, 1, 1 ],
 *        [ 2, 0, 0, 0, 0, 4 ],
 *        [ 2, 0, 1, 2, 0, 4 ],
 *        [ 2, 0, 3, 4, 0, 4 ],
 *        [ 2, 0, 0, 0, 0, 4 ],
 *        [ 3, 3, 3, 3, 3, 3 ]
 *    ]
 * ```
 */
export function CheckMatrix (matrix: unknown[][]): boolean
{
    if (!Array.isArray(matrix) || matrix.length < 2 || !Array.isArray(matrix[0]))
    {
        return false;
    }

    //  How long is the first row?
    const size = matrix[0].length;

    //  Validate the rest of the rows are the same length
    for (let i = 1; i < matrix.length; i++)
    {
        if (matrix[i].length !== size)
        {
            return false;
        }
    }

    return true;
}
