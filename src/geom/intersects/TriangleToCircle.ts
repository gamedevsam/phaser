/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Contains } from '../triangle/Contains';
import { GetEdges } from '../triangle/GetEdges';
import { ICircle } from '../circle/ICircle';
import { ITriangle } from '../triangle/ITriangle';
import { LineToCircle } from './LineToCircle';

/**
 * Checks if a Triangle and a Circle intersect.
 *
 * A Circle intersects a Triangle if its center is located within it or if any of the Triangle's sides intersect the Circle. As such, the Triangle and the Circle are considered "solid" for the intersection.
 *
 * @function Phaser.Geom.Intersects.TriangleToCircle
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Triangle} triangle - The Triangle to check for intersection.
 * @param {Phaser.Geom.Circle} circle - The Circle to check for intersection.
 *
 * @return {boolean} `true` if the Triangle and the `Circle` intersect, otherwise `false`.
 */
export function TriangleToCircle (triangle: ITriangle, circle: ICircle): boolean
{
    //  First the cheapest ones:

    if (
        triangle.left > circle.right ||
        triangle.right < circle.left ||
        triangle.top > circle.bottom ||
        triangle.bottom < circle.top)
    {
        return false;
    }

    if (Contains(triangle, circle.x, circle.y))
    {
        return true;
    }

    const [ line1, line2, line3 ] = GetEdges(triangle);

    return (
        LineToCircle(line1, circle) ||
        LineToCircle(line2, circle) ||
        LineToCircle(line3, circle)
    );
}
