/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Transposes the elements of the given matrix (array of arrays).
 *
 * The transpose of a matrix is a new matrix whose rows are the columns of the original.
 */
export function TransposeMatrix (matrix: unknown[][]): unknown[][]
{
    const sourceRowCount = matrix.length;
    const sourceColCount = matrix[0].length;

    const result = new Array(sourceColCount);

    for (let i = 0; i < sourceColCount; i++)
    {
        result[i] = new Array(sourceRowCount);

        for (let j = sourceRowCount - 1; j > -1; j--)
        {
            result[i][j] = matrix[j][i];
        }
    }

    return result;
}
