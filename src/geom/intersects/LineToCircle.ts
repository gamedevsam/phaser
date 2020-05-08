/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Contains } from '../circle/Contains';
import { ICircle } from '../circle/ICircle';
import { ILine } from '../line/ILine';
import { IVec2 } from '../../math/vec2/IVec2';
import { Vec2 } from '../../math/vec2/Vec2';

const tmp: Vec2 = new Vec2();

/**
 * Checks for intersection between the line segment and circle.
 *
 * Based on code by [Matt DesLauriers](https://github.com/mattdesl/line-circle-collision/blob/master/LICENSE.md).
 *
 * @function Phaser.Geom.Intersects.LineToCircle
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Line} line - The line segment to check.
 * @param {Phaser.Geom.Circle} circle - The circle to check against the line.
 * @param {(Phaser.Geom.Point|any)} [nearest] - An optional Point-like object. If given the closest point on the Line where the circle intersects will be stored in this object.
 *
 * @return {boolean} `true` if the two objects intersect, otherwise `false`.
 */
export function LineToCircle (line: ILine, circle: ICircle, nearest?: IVec2): boolean
{
    if (!nearest)
    {
        nearest = tmp;
    }

    const { x1, y1, x2, y2 } = line;

    if (Contains(circle, x1, y1))
    {
        nearest.set(x1, y1);

        return true;
    }

    if (Contains(circle, x2, y2))
    {
        nearest.set(x2, y2);

        return true;
    }

    const dx = x2 - x1;
    const dy = y2 - y1;

    const lcx = circle.x - x1;
    const lcy = circle.y - y1;

    //  project lc onto d, resulting in vector p
    const dLen2 = (dx * dx) + (dy * dy);
    let px = dx;
    let py = dy;

    if (dLen2 > 0)
    {
        const dp = ((lcx * dx) + (lcy * dy)) / dLen2;

        px *= dp;
        py *= dp;
    }

    nearest.set(x1 + px, y1 + py);

    //  len2 of p
    const pLen2 = (px * px) + (py * py);

    return (
        pLen2 <= dLen2 &&
        ((px * dx) + (py * dy)) >= 0 &&
        Contains(circle, nearest.x, nearest.y)
    );
}
