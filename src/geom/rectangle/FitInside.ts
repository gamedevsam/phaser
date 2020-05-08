/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { CenterX } from './CenterX';
import { CenterY } from './CenterY';
import { GetAspectRatio } from './GetAspectRatio';
import { IRectangle } from './IRectangle';

/**
 * Adjusts the target rectangle, changing its width, height and position,
 * so that it fits inside the area of the source rectangle, while maintaining its original
 * aspect ratio.
 *
 * Unlike the `FitOutside` function, there may be some space inside the source area not covered.
 *
 * @function Phaser.Geom.Rectangle.FitInside
 * @since 3.0.0
 *
 * @generic {Phaser.Geom.Rectangle} O - [target,$return]
 *
 * @param {Phaser.Geom.Rectangle} target - The target rectangle to adjust.
 * @param {Phaser.Geom.Rectangle} source - The source rectangle to envelop the target in.
 *
 * @return {Phaser.Geom.Rectangle} The modified target rectangle instance.
 */
export function FitInside (target: IRectangle, source: IRectangle): IRectangle
{
    const ratio = GetAspectRatio(target);

    let width: number = source.width;
    let height: number = source.height;

    if (ratio < GetAspectRatio(source))
    {
        //  Taller than Wide
        width = source.height * ratio;
    }
    else
    {
        //  Wider than Tall
        height = source.width / ratio;
    }

    return target.set(
        CenterX(source) - (target.width / 2),
        CenterY(source) - (target.height / 2),
        width,
        height
    );
}
