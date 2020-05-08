/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { GetEdges } from '../triangle/GetEdges';
import { GetTriangleToLine } from './GetTriangleToLine';
import { ITriangle } from '../triangle/ITriangle';
import { TriangleToTriangle } from './TriangleToTriangle';
import { Vec2 } from '../../math/vec2/Vec2';

/**
 * Checks if two Triangles intersect, and returns the intersection points as a Point object array.
 *
 * A Triangle intersects another Triangle if any pair of their lines intersects or if any point of one Triangle is within the other Triangle. Thus, the Triangles are considered "solid".
 *
 * @function Phaser.Geom.Intersects.GetTriangleToTriangle
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Triangle} triangleA - The first Triangle to check for intersection.
 * @param {Phaser.Geom.Triangle} triangleB - The second Triangle to check for intersection.
 * @param {array} [out] - An optional array in which to store the points of intersection.
 *
 * @return {array} An array with the points of intersection if objects intersect, otherwise an empty array.
 */
export function GetTriangleToTriangle (triangleA: ITriangle, triangleB: ITriangle, out: Vec2[] = []): Vec2[]
{
    if (TriangleToTriangle(triangleA, triangleB))
    {
        const [ lineA, lineB, lineC ] = GetEdges(triangleB);

        GetTriangleToLine(triangleA, lineA, out);
        GetTriangleToLine(triangleA, lineB, out);
        GetTriangleToLine(triangleA, lineC, out);
    }

    return out;
}
