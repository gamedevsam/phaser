/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Calculate the distance between two sets of coordinates (points) to the power of `pow`.
 *
 * @function Phaser.Math.Distance.Power
 * @since 3.0.0
 *
 * @param {number} x1 - The x coordinate of the first point.
 * @param {number} y1 - The y coordinate of the first point.
 * @param {number} x2 - The x coordinate of the second point.
 * @param {number} y2 - The y coordinate of the second point.
 * @param {number} [pow=2] - The exponent.
 *
 * @return {number} The distance between each point.
 */
export function DistancePower (x1: number, y1: number, x2: number, y2: number, pow: number = 2): number
{
    return Math.sqrt(Math.pow(x2 - x1, pow) + Math.pow(y2 - y1, pow));
}
