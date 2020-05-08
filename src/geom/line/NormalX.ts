/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Angle } from './Angle';
import { ILine } from './ILine';
import { MATH_CONST } from '../../math/const';

/**
 * Returns the x component of the normal vector of the given line.
 *
 * @function Phaser.Geom.Line.NormalX
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Line} line - The Line object to get the normal value from.
 *
 * @return {number} The x component of the normal vector of the line.
 */
export function NormalX (line: ILine): number
{
    return Math.cos(Angle(line) - MATH_CONST.HALF_PI);
}
