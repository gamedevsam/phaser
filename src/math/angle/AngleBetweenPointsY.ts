/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { IVec2 } from '../vec2/IVec2';

/**
 * Find the angle of a segment from (point1.x, point1.y) -> (point2.x, point2.y).
 *
 * The difference between this method and {@link Phaser.Math.Angle.BetweenPoints} is that this assumes the y coordinate
 * travels down the screen.
 *
 * @function Phaser.Math.Angle.BetweenPointsY
 * @since 3.0.0
 *
 * @param {IVec2} point1 - The first point.
 * @param {IVec2} point2 - The second point.
 *
 * @return {number} The angle in radians.
 */
export function AngleBetweenPointsY (point1: IVec2, point2: IVec2): number
{
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}
