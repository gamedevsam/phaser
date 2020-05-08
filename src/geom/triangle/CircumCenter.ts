/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { ITriangle } from './ITriangle';
import { Vec2 } from '../../math/vec2/Vec2';

/**
 * Computes the determinant of a 2x2 matrix. Uses standard double-precision arithmetic, so is susceptible to round-off error.
 *
 * Adapted from http://bjornharrtell.github.io/jsts/doc/api/jsts_geom_Triangle.js.html
 *
 * @function det
 * @private
 * @since 3.0.0
 *
 * @param {number} m00 - The [0,0] entry of the matrix.
 * @param {number} m01 - The [0,1] entry of the matrix.
 * @param {number} m10 - The [1,0] entry of the matrix.
 * @param {number} m11 - The [1,1] entry of the matrix.
 *
 * @return {number} the determinant.
 */
function Det (m00: number, m01: number, m10: number, m11: number): number
{
    return (m00 * m11) - (m01 * m10);
}

/**
 * Computes the circumcentre of a triangle. The circumcentre is the centre of
 * the circumcircle, the smallest circle which encloses the triangle. It is also
 * the common intersection point of the perpendicular bisectors of the sides of
 * the triangle, and is the only point which has equal distance to all three
 * vertices of the triangle.
 *
 * @function Phaser.Geom.Triangle.CircumCenter
 * @since 3.0.0
 *
 * @generic {Phaser.Math.Vector2} O - [out,$return]
 *
 * @param {Phaser.Geom.Triangle} triangle - The Triangle to get the circumcenter of.
 * @param {Phaser.Math.Vector2} [out] - The Vector2 object to store the position in. If not given, a new Vector2 instance is created.
 *
 * @return {Phaser.Math.Vector2} A Vector2 object holding the coordinates of the circumcenter of the Triangle.
 */
export function CircumCenter (triangle: ITriangle, out: Vec2 = new Vec2()): Vec2
{
    const cx = triangle.x3;
    const cy = triangle.y3;

    const ax = triangle.x1 - cx;
    const ay = triangle.y1 - cy;

    const bx = triangle.x2 - cx;
    const by = triangle.y2 - cy;

    const denom = 2 * Det(ax, ay, bx, by);
    const numx = Det(ay, ax * ax + ay * ay, by, bx * bx + by * by);
    const numy = Det(ax, ax * ax + ay * ay, bx, bx * bx + by * by);

    return out.set(
        cx - numx / denom,
        cy + numy / denom
    );
}
