/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { CircleToRectangle } from './CircleToRectangle';
import { GetEdges } from '../rectangle/GetEdges';
import { GetLineToCircle } from './GetLineToCircle';
import { ICircle } from '../circle/ICircle';
import { IRectangle } from '../rectangle/IRectangle';
import { Vec2 } from '../../math/vec2/Vec2';

/**
 * Checks for intersection between a circle and a rectangle,
 * and returns the intersection points as a Point object array.
 *
 * @function Phaser.Geom.Intersects.GetCircleToRectangle
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Circle} circle - The circle to be checked.
 * @param {Phaser.Geom.Rectangle} rect - The rectangle to be checked.
 * @param {array} [out] - An optional array in which to store the points of intersection.
 *
 * @return {array} An array with the points of intersection if objects intersect, otherwise an empty array.
 */
export function GetCircleToRectangle (circle: ICircle, rect: IRectangle, out: Vec2[] = []): Vec2[]
{
    if (CircleToRectangle(circle, rect))
    {
        const [ line1, line2, line3, line4 ] = GetEdges(rect);

        GetLineToCircle(line1, circle, out);
        GetLineToCircle(line2, circle, out);
        GetLineToCircle(line3, circle, out);
        GetLineToCircle(line4, circle, out);
    }

    return out;
}
