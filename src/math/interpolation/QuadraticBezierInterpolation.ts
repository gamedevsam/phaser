/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * @ignore
 */
function P0 (t: number, p: number): number
{
    const k = 1 - t;

    return k * k * p;
}

/**
 * @ignore
 */
function P1 (t: number, p: number): number
{
    return 2 * (1 - t) * t * p;
}

/**
 * @ignore
 */
function P2 (t: number, p: number): number
{
    return t * t * p;
}

// https://github.com/mrdoob/three.js/blob/master/src/extras/core/Interpolations.js

/**
 * A quadratic bezier interpolation method.
 *
 * @function Phaser.Math.Interpolation.QuadraticBezier
 * @since 3.2.0
 *
 * @param {number} t - The percentage of interpolation, between 0 and 1.
 * @param {number} p0 - The start point.
 * @param {number} p1 - The control point.
 * @param {number} p2 - The end point.
 *
 * @return {number} The interpolated value.
 */
export function QuadraticBezierInterpolation (t: number, p0: number, p1: number, p2: number): number
{
    return P0(t, p0) + P1(t, p1) + P2(t, p2);
}
