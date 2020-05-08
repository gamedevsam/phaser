/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { CenterX } from './CenterX';
import { CenterY } from './CenterY';
import { DegToRad } from '../../math/DegToRad';
import { IRectangle } from './IRectangle';
import { Vec2 } from '../../math/vec2/Vec2';

/**
 * Returns a Point from the perimeter of a Rectangle based on the given angle.
 *
 * @function Phaser.Geom.Rectangle.PerimeterPoint
 * @since 3.0.0
 *
 * @generic {Phaser.Geom.Point} O - [out,$return]
 *
 * @param {Phaser.Geom.Rectangle} rectangle - The Rectangle to get the perimeter point from.
 * @param {number} angle - The angle of the point, in degrees.
 * @param {Phaser.Geom.Point} [out] - The Point object to store the position in. If not given, a new Point instance is created.
 *
 * @return {Phaser.Geom.Point} A Point object holding the coordinates of the Rectangle perimeter.
 */
export function PerimeterPoint (rectangle: IRectangle, angle: number, out: Vec2 = new Vec2()): Vec2
{
    angle = DegToRad(angle);

    const s = Math.sin(angle);
    const c = Math.cos(angle);

    let dx = (c > 0) ? rectangle.width / 2 : rectangle.width / -2;
    let dy = (s > 0) ? rectangle.height / 2 : rectangle.height / -2;

    if (Math.abs(dx * s) < Math.abs(dy * c))
    {
        dy = (dx * s) / c;
    }
    else
    {
        dx = (dy * c) / s;
    }

    return out.set(
        dx + CenterX(rectangle),
        dy + CenterY(rectangle)
    );
}
