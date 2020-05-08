/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Contains } from './Contains';
import { ICircle } from './ICircle';
import { IVec2 } from '../../math/vec2/IVec2';

/**
 * Check to see if the Circle contains the given Point object.
 *
 * @function Phaser.Geom.Circle.ContainsPoint
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Circle} circle - The Circle to check.
 * @param {(Phaser.Geom.Point|object)} point - The Point object to check if it's within the Circle or not.
 *
 * @return {boolean} True if the Point coordinates are within the circle, otherwise false.
 */
export function ContainsPoint (circle: ICircle, point: IVec2): boolean
{
    return Contains(circle, point.x, point.y);
}
