/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Circumference } from './Circumference';
import { CircumferencePoint } from './CircumferencePoint';
import { FromPercent } from '../../math/FromPercent';
import { IEllipse } from './IEllipse';
import { MATH_CONST } from '../../math/const';
import { Vec2 } from '../../math/vec2/Vec2';

/**
 * Returns an array of Point objects containing the coordinates of the points around the circumference of the Ellipse,
 * based on the given quantity or stepRate values.
 *
 * @function Phaser.Geom.Ellipse.GetPoints
 * @since 3.0.0
 *
 * @generic {Phaser.Geom.Point[]} O - [out,$return]
 *
 * @param {Phaser.Geom.Ellipse} ellipse - The Ellipse to get the points from.
 * @param {integer} quantity - The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
 * @param {number} [stepRate] - Sets the quantity by getting the circumference of the ellipse and dividing it by the stepRate.
 * @param {(array|Phaser.Geom.Point[])} [out] - An array to insert the points in to. If not provided a new array will be created.
 *
 * @return {(array|Phaser.Geom.Point[])} An array of Point objects pertaining to the points around the circumference of the ellipse.
 */
export function GetPoints (ellipse: IEllipse, step: number, quantity: number = 0,  out: Vec2[] = []): Vec2[]
{
    //  If quantity is a falsey value (false, null, 0, undefined, etc) then we calculate it based on the stepRate instead.
    if (!quantity)
    {
        quantity = Circumference(ellipse) / step;
    }

    for (let i = 0; i < quantity; i++)
    {
        const angle = FromPercent(i / quantity, 0, MATH_CONST.PI2);

        out.push(CircumferencePoint(ellipse, angle));
    }

    return out;
}
