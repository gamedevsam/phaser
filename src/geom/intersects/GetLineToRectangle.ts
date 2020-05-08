/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { GetEdges } from '../rectangle/GetEdges';
import { ILine } from '../line/ILine';
import { IRectangle } from '../rectangle/IRectangle';
import { LineToLine } from './LineToLine';
import { LineToRectangle } from './LineToRectangle';
import { Vec2 } from '../../math/vec2/Vec2';

/**
 * Checks for intersection between the Line and a Rectangle shape,
 * and returns the intersection points as a Point object array.
 *
 * @function Phaser.Geom.Intersects.GetLineToRectangle
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Line} line - The Line to check for intersection.
 * @param {(Phaser.Geom.Rectangle|object)} rect - The Rectangle to check for intersection.
 * @param {array} [out] - An optional array in which to store the points of intersection.
 *
 * @return {array} An array with the points of intersection if objects intersect, otherwise an empty array.
 */
export function GetLineToRectangle (line: ILine, rect: IRectangle, out: Vec2[] = []): Vec2[]
{
    if (LineToRectangle(line, rect))
    {
        const [ lineA, lineB, lineC, lineD ] = GetEdges(rect);

        const points = [ new Vec2(), new Vec2(), new Vec2(), new Vec2() ];

        const results = [
            LineToLine(lineA, line, points[0]),
            LineToLine(lineB, line, points[1]),
            LineToLine(lineC, line, points[2]),
            LineToLine(lineD, line, points[3])
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
