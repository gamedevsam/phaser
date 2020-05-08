/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { ITriangle } from './ITriangle';
import { IVec2 } from '../../math/vec2/IVec2';
import { RotateAroundXY } from './RotateAroundXY';

/**
 * Rotates a Triangle at a certain angle about a given Point or object with public `x` and `y` properties.
 *
 * @function Phaser.Geom.Triangle.RotateAroundPoint
 * @since 3.0.0
 *
 * @generic {Phaser.Geom.Triangle} O - [triangle,$return]
 *
 * @param {Phaser.Geom.Triangle} triangle - The Triangle to rotate.
 * @param {Phaser.Geom.Point} point - The Point to rotate the Triangle about.
 * @param {number} angle - The angle by which to rotate the Triangle, in radians.
 *
 * @return {Phaser.Geom.Triangle} The rotated Triangle.
 */
export function RotateAroundPoint (triangle: ITriangle, point: IVec2, angle: number): ITriangle
{
    return RotateAroundXY(triangle, point.x, point.y, angle);
}
