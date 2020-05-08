/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Circumference } from './Circumference';
import { CircumferencePoint } from './CircumferencePoint';
import { FromPercent } from '../../math/FromPercent';
import { ICircle } from './ICircle';
import { MATH_CONST } from '../../math/const';
import { Vec2 } from '../../math/vec2/Vec2';

/**
 * Returns an array of Point objects containing the coordinates of the points around the circumference of the Circle,
 * based on the given quantity or stepRate values.
 *
 * @function Phaser.Geom.Circle.GetPoints
 * @since 3.0.0
 *
 * @param {Phaser.Geom.Circle} circle - The Circle to get the points from.
 * @param {number} step - Sets the quantity by getting the circumference of the circle and dividing it by the stepRate.
 * @param {integer} [quantity=0] - The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
 * @param {array} [output] - An array to insert the points in to. If not provided a new array will be created.
 *
 * @return {Phaser.Geom.Point[]} An array of Point objects pertaining to the points around the circumference of the circle.
 */
export function GetPoints (circle: ICircle, step: number, quantity: number = 0, out: Vec2[] = []): Vec2[]
{
    //  If quantity is a falsey value (false, null, 0, undefined, etc) then we calculate it based on the stepRate instead.
    if (!quantity)
    {
        quantity = Circumference(circle) / step;
    }

    for (let i = 0; i < quantity; i++)
    {
        const angle = FromPercent(i / quantity, 0, MATH_CONST.PI2);

        out.push(CircumferencePoint(circle, angle));
    }

    return out;
}
