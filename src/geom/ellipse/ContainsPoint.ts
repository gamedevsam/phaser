/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Contains } from './Contains';
import { IEllipse } from './IEllipse';
import { IVec2 } from '../../math/vec2/IVec2';

/**
 * Check to see if the Ellipse contains the given Point object.
 *
 * @function Phaser.Geom.Ellipse.ContainsPoint
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Ellipse} ellipse - The Ellipse to check.
 * @param {(Phaser.Geom.Point|object)} point - The Point object to check if it's within the Circle or not.
 *
 * @return {boolean} True if the Point coordinates are within the circle, otherwise false.
 */
export function ContainsPoint (ellipse: IEllipse, point: IVec2): boolean
{
    return Contains(ellipse, point.x, point.y);
}
