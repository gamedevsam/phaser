/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Angle } from './Angle';
import { ILine } from './ILine';
import { MATH_CONST } from '../../math/const';
import { Wrap } from '../../math/Wrap';

/**
 * Get the angle of the normal of the given line in radians.
 *
 * @function Phaser.Geom.Line.NormalAngle
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Line} line - The line to calculate the angle of the normal of.
 *
 * @return {number} The angle of the normal of the line in radians.
 */
export function NormalAngle (line: ILine): number
{
    const angle = Angle(line) - MATH_CONST.HALF_PI;

    return Wrap(angle, -Math.PI, Math.PI);
}
