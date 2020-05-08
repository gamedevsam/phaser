/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Contains } from '../rectangle/Contains';
import { ContainsArray } from '../triangle/ContainsArray';
import { Decompose } from '../rectangle/Decompose';
import { GetEdges as GetRectangleEdges } from '../rectangle/GetEdges';
import { GetEdges as GetTriangleEdges } from '../triangle/GetEdges';
import { IRectangle } from '../rectangle/IRectangle';
import { ITriangle } from '../triangle/ITriangle';
import { LineToLine } from './LineToLine';

/**
 * Checks for intersection between Rectangle shape and Triangle shape.
 *
 * @function Phaser.Geom.Intersects.RectangleToTriangle
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Rectangle} rect - Rectangle object to test.
 * @param {Phaser.Geom.Triangle} triangle - Triangle object to test.
 *
 * @return {boolean} A value of `true` if objects intersect; otherwise `false`.
 */
export function RectangleToTriangle (rect: IRectangle, triangle: ITriangle): boolean
{
    //  First the cheapest ones:

    if (
        triangle.left > rect.right ||
        triangle.right < rect.x ||
        triangle.top > rect.bottom ||
        triangle.bottom < rect.y)
    {
        return false;
    }

    const [ triA, triB, triC ] = GetTriangleEdges(triangle);

    //  Are any of the triangle points within the rectangle?

    if (Contains(rect, triA.x1, triA.y1) || Contains(rect, triA.x2, triA.y2))
    {
        return true;
    }

    if (Contains(rect, triB.x1, triB.y1) || Contains(rect, triB.x2, triB.y2))
    {
        return true;
    }

    if (Contains(rect, triC.x1, triC.y1) || Contains(rect, triC.x2, triC.y2))
    {
        return true;
    }

    //  Cheap tests over, now to see if any of the lines intersect ...

    const [ rectA, rectB, rectC, rectD ] = GetRectangleEdges(rect);

    if (LineToLine(triA, rectA) || LineToLine(triA, rectB) || LineToLine(triA, rectC) || LineToLine(triA, rectD))
    {
        return true;
    }

    if (LineToLine(triB, rectA) || LineToLine(triB, rectB) || LineToLine(triB, rectC) || LineToLine(triB, rectD))
    {
        return true;
    }

    if (LineToLine(triC, rectA) || LineToLine(triC, rectB) || LineToLine(triC, rectC) || LineToLine(triC, rectD))
    {
        return true;
    }

    //  None of the lines intersect, so are any rectangle points within the triangle?

    const within = ContainsArray(triangle, Decompose(rect), true);

    return (within.length > 0);
}
