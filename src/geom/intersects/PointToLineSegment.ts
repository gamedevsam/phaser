/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { ILine } from '../line/ILine';
import { IVec2 } from '../../math/vec2/IVec2';
import { PointToLine } from './PointToLine';

/**
 * Checks if a Point is located on the given line segment.
 *
 * @function Phaser.Geom.Intersects.PointToLineSegment
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Point} point - The Point to check for intersection.
 * @param {Phaser.Geom.Line} line - The line segment to check for intersection.
 *
 * @return {boolean} `true` if the Point is on the given line segment, otherwise `false`.
 */
export function PointToLineSegment (point: IVec2, line: ILine): boolean
{
    if (!PointToLine(point, line))
    {
        return false;
    }

    const { x1, y1, x2, y2 } = line;
    const { x, y } = point;

    const xMin = Math.min(x1, x2);
    const xMax = Math.max(x1, x2);
    const yMin = Math.min(y1, y2);
    const yMax = Math.max(y1, y2);

    return ((x >= xMin && x <= xMax) && (y >= yMin && y <= yMax));
}
