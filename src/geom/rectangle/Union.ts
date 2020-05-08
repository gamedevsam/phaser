/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { IRectangle } from './IRectangle';
import { Rectangle } from './Rectangle';

/**
 * Creates a new Rectangle or repositions and/or resizes an existing Rectangle so that it encompasses the two given Rectangles, i.e. calculates their union.
 *
 * @function Phaser.Geom.Rectangle.Union
 * @since 3.0.0
 *
 * @generic {Phaser.Geom.Rectangle} O - [out,$return]
 *
 * @param {Phaser.Geom.Rectangle} rectA - The first Rectangle to use.
 * @param {Phaser.Geom.Rectangle} rectB - The second Rectangle to use.
 * @param {Phaser.Geom.Rectangle} [out] - The Rectangle to store the union in.
 *
 * @return {Phaser.Geom.Rectangle} The modified `out` Rectangle, or a new Rectangle if none was provided.
 */
export function Union (rectA: IRectangle, rectB: IRectangle, out: Rectangle = new Rectangle()): Rectangle
{
    //  Cache vars so we can use one of the input rects as the output rect
    const x = Math.min(rectA.x, rectB.x);
    const y = Math.min(rectA.y, rectB.y);
    const w = Math.max(rectA.right, rectB.right) - x;
    const h = Math.max(rectA.bottom, rectB.bottom) - y;

    return out.set(x, y, w, h);
}
