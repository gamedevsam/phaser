/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Angle } from './Angle';
import { ILine } from './ILine';
import { MATH_CONST } from '../../math/const';
import { Vec2 } from '../../math/vec2/Vec2';

/**
 * Calculate the normal of the given line.
 *
 * The normal of a line is a vector that points perpendicular from it.
 *
 * @function Phaser.Geom.Line.GetNormal
 * @since 3.0.0
 *
 * @generic {Phaser.Geom.Point} O - [out,$return]
 *
 * @param {Phaser.Geom.Line} line - The line to calculate the normal of.
 * @param {(Phaser.Geom.Point|object)} [out] - An optional point object to store the normal in.
 *
 * @return {(Phaser.Geom.Point|object)} The normal of the Line.
 */
export function GetNormal (line: ILine, out: Vec2 = new Vec2()): Vec2
{
    const a = Angle(line) - MATH_CONST.HALF_PI;

    out.x = Math.cos(a);
    out.y = Math.sin(a);

    return out;
}
