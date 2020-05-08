/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { ICircle } from '../circle/ICircle';
import { ILine } from '../line/ILine';
import { LineToCircle } from './LineToCircle';
import { Vec2 } from '../../math/vec2/Vec2';

/**
 * Checks for intersection between the line segment and circle,
 * and returns the intersection points as a Point object array.
 *
 * @function Phaser.Geom.Intersects.GetLineToCircle
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Line} line - The line segment to check.
 * @param {Phaser.Geom.Circle} circle - The circle to check against the line.
 * @param {array} [out] - An optional array in which to store the points of intersection.
 *
 * @return {array} An array with the points of intersection if objects intersect, otherwise an empty array.
 */
export function GetLineToCircle (line: ILine, circle: ICircle, out: Vec2[] = []): Vec2[]
{
    if (LineToCircle(line, circle))
    {
        const { x1, y1, x2, y2 } = line;

        const cr = circle.radius;

        const lDirX = x2 - x1;
        const lDirY = y2 - y1;
        const oDirX = x1 - circle.x;
        const oDirY = y1 - circle.y;

        const coefficientA = lDirX * lDirX + lDirY * lDirY;
        const coefficientB = 2 * (lDirX * oDirX + lDirY * oDirY);
        const coefficientC = oDirX * oDirX + oDirY * oDirY - cr * cr;

        const lambda = (coefficientB * coefficientB) - (4 * coefficientA * coefficientC);

        let x: number;
        let y: number;

        if (lambda === 0)
        {
            const root = -coefficientB / (2 * coefficientA);

            x = x1 + root * lDirX;
            y = y1 + root * lDirY;

            if (root >= 0 && root <= 1)
            {
                out.push(new Vec2(x, y));
            }
        }
        else if (lambda > 0)
        {
            const root1 = (-coefficientB - Math.sqrt(lambda)) / (2 * coefficientA);

            x = x1 + root1 * lDirX;
            y = y1 + root1 * lDirY;

            if (root1 >= 0 && root1 <= 1)
            {
                out.push(new Vec2(x, y));
            }

            const root2 = (-coefficientB + Math.sqrt(lambda)) / (2 * coefficientA);

            x = x1 + root2 * lDirX;
            y = y1 + root2 * lDirY;

            if (root2 >= 0 && root2 <= 1)
            {
                out.push(new Vec2(x, y));
            }
        }
    }

    return out;
}
