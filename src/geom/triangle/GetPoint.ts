/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { GetEdges } from './GetEdges';
import { ITriangle } from './ITriangle';
import { Length } from '../line/Length';
import { Vec2 } from '../../math/vec2/Vec2';

/**
 * Returns a Point from around the perimeter of a Triangle.
 *
 * @function Phaser.Geom.Triangle.GetPoint
 * @since 3.0.0
 *
 * @generic {Phaser.Geom.Point} O - [out,$return]
 *
 * @param {Phaser.Geom.Triangle} triangle - The Triangle to get the point on its perimeter from.
 * @param {number} position - The position along the perimeter of the triangle. A value between 0 and 1.
 * @param {(Phaser.Geom.Point|object)} [out] - An option Point, or Point-like object to store the value in. If not given a new Point will be created.
 *
 * @return {(Phaser.Geom.Point|object)} A Point object containing the given position from the perimeter of the triangle.
 */
export function GetPoint (triangle: ITriangle, position: number, out: Vec2 = new Vec2()): Vec2
{
    const [ line1, line2, line3 ] = GetEdges(triangle);

    if (position <= 0 || position >= 1)
    {
        return out.set(
            line1.x1,
            line1.y1
        );
    }

    const length1 = Length(line1);
    const length2 = Length(line2);
    const length3 = Length(line3);

    const perimeter = length1 + length2 + length3;

    let p = perimeter * position;
    let localPosition = 0;

    //  Which line is it on?

    if (p < length1)
    {
        //  Line 1
        localPosition = p / length1;

        const { x1, y1, x2, y2 } = line1;

        return out.set(
            x1 + (x2 - x1) * localPosition,
            y1 + (y2 - y1) * localPosition
        );
    }
    else if (p > length1 + length2)
    {
        //  Line 3
        p -= length1 + length2;
        localPosition = p / length3;

        const { x1, y1, x2, y2 } = line3;

        return out.set(
            x1 + (x2 - x1) * localPosition,
            y1 + (y2 - y1) * localPosition
        );
    }
    else
    {
        //  Line 2
        p -= length1;
        localPosition = p / length2;

        const { x1, y1, x2, y2 } = line2;

        return out.set(
            x1 + (x2 - x1) * localPosition,
            y1 + (y2 - y1) * localPosition
        );
    }
}
