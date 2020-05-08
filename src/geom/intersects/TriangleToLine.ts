/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Contains } from '../triangle/Contains';
import { GetEdges } from '../triangle/GetEdges';
import { ILine } from '../line/ILine';
import { ITriangle } from '../triangle/ITriangle';
import { LineToLine } from './LineToLine';

/**
 * Checks if a Triangle and a Line intersect.
 *
 * The Line intersects the Triangle if it starts inside of it, ends inside of it, or crosses any of the Triangle's sides. Thus, the Triangle is considered "solid".
 *
 * @function Phaser.Geom.Intersects.TriangleToLine
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Triangle} triangle - The Triangle to check with.
 * @param {Phaser.Geom.Line} line - The Line to check with.
 *
 * @return {boolean} `true` if the Triangle and the Line intersect, otherwise `false`.
 */
export function TriangleToLine (triangle: ITriangle, line: ILine): boolean
{
    const { x1, y1, x2, y2 } = line;

    //  If the Triangle contains either the start or end point of the line, it intersects
    if (Contains(triangle, x1, y1) || Contains(triangle, x2, y2))
    {
        return true;
    }

    const [ line1, line2, line3 ] = GetEdges(triangle);

    //  Now check the line against each line of the Triangle
    return (
        LineToLine(line1, line) ||
        LineToLine(line2, line) ||
        LineToLine(line3, line)
    );
}
