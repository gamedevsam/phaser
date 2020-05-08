/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { GetEdges } from '../triangle/GetEdges';
import { ILine } from '../line/ILine';
import { ITriangle } from '../triangle/ITriangle';
import { LineToLine } from './LineToLine';
import { TriangleToLine } from './TriangleToLine';
import { Vec2 } from '../../math/vec2/Vec2';

/**
 * Checks if a Triangle and a Line intersect, and returns the intersection points as a Point object array.
 *
 * The Line intersects the Triangle if it starts inside of it, ends inside of it, or crosses any of the Triangle's sides. Thus, the Triangle is considered "solid".
 *
 * @function Phaser.Geom.Intersects.GetTriangleToLine
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Triangle} triangle - The Triangle to check with.
 * @param {Phaser.Geom.Line} line - The Line to check with.
 * @param {array} [out] - An optional array in which to store the points of intersection.
 *
 * @return {array} An array with the points of intersection if objects intersect, otherwise an empty array.
 */
export function GetTriangleToLine (triangle: ITriangle, line: ILine, out: Vec2[] = []): Vec2[]
{
    if (TriangleToLine(triangle, line))
    {
        const [ lineA, lineB, lineC ] = GetEdges(triangle);

        const points = [ new Vec2(), new Vec2(), new Vec2() ];

        const results = [
            LineToLine(lineA, line, points[0]),
            LineToLine(lineB, line, points[1]),
            LineToLine(lineC, line, points[2])
        ];

        for (let i = 0; i < results.length; i++)
        {
            if (results[i])
            {
                out.push(points[i]);
            }
        }
    }

    return out;
}
