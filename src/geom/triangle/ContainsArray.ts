/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Contains } from './Contains';
import { ITriangle } from './ITriangle';
import { IVec2 } from '../../math/vec2/IVec2';
import { Vec2 } from '../../math/vec2/Vec2';

/**
 * Filters an array of point-like objects to only those contained within a triangle.
 * If `returnFirst` is true, will return an array containing only the first point in the provided array that is within the triangle (or an empty array if there are no such points).
 *
 * http://www.blackpawn.com/texts/pointinpoly/
 *
 * points is an array of Point-like objects with public x/y properties
 * returns an array containing all points that are within the triangle, or an empty array if none
 * if 'returnFirst' is true it will return after the first point within the triangle is found
 *
 * @function Phaser.Geom.Triangle.ContainsArray
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Triangle} triangle - The triangle that the points are being checked in.
 * @param {Phaser.Geom.Point[]} points - An array of point-like objects (objects that have an `x` and `y` property)
 * @param {boolean} [returnFirst=false] - If `true`, return an array containing only the first point found that is within the triangle.
 * @param {array} [out] - If provided, the points that are within the triangle will be appended to this array instead of being added to a new array. If `returnFirst` is true, only the first point found within the triangle will be appended. This array will also be returned by this function.
 *
 * @return {Phaser.Geom.Point[]} An array containing all the points from `points` that are within the triangle, if an array was provided as `out`, points will be appended to that array and it will also be returned here.
 */
export function ContainsArray (triangle: ITriangle, points: IVec2[], returnFirst: boolean = false, out: Vec2[] = []): Vec2[]
{
    let skip = false;

    points.forEach(point =>
    {
        if (skip)
        {
            return;
        }

        const { x, y } = point;

        if (Contains(triangle, x, y))
        {
            out.push(new Vec2(x, y));

            if (returnFirst)
            {
                skip = true;
            }
        }
    });

    return out;
}
