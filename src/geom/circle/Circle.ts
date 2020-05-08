/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Contains } from './Contains';

/**
 * @classdesc
 * A Circle object.
 *
 * This is a geometry object, containing numerical values and related methods to inspect and modify them.
 * It is not a Game Object, in that you cannot add it to the display list, and it has no texture.
 * To render a Circle you should look at the capabilities of the Graphics class.
 *
 * @class Circle
 * @memberof Phaser.Geom
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [x=0] - The x position of the center of the circle.
 * @param {number} [y=0] - The y position of the center of the circle.
 * @param {number} [radius=0] - The radius of the circle.
 */
export class Circle
{
    x: number;
    y: number;

    private _radius: number;
    private _diameter: number;

    constructor (x: number = 0, y: number = 0, radius: number = 0)
    {
        this.set(x, y, radius);
    }

    set (x: number = 0, y: number = 0, radius: number = 0): this
    {
        this.x = x;
        this.y = y;
        this.radius = radius;

        return this;
    }

    contains (x: number, y: number): boolean
    {
        return Contains(this, x, y);
    }

    get radius (): number
    {
        return this._radius;
    }

    set radius (value: number)
    {
        this._radius = value;
        this._diameter = value * 2;
    }

    get diameter (): number
    {
        return this._diameter;
    }

    set diameter (value: number)
    {
        this._diameter = value;
        this._radius = value * 0.5;
    }

    get left (): number
    {
        return this.x - this._radius;
    }

    set left (value: number)
    {
        this.x = value + this._radius;
    }

    get right (): number
    {
        return this.x + this._radius;
    }

    set right (value: number)
    {
        this.x = value - this._radius;
    }

    get top (): number
    {
        return this.y - this._radius;
    }

    set top (value: number)
    {
        this.y = value + this._radius;
    }

    get bottom (): number
    {
        return this.y + this._radius;
    }

    set bottom (value: number)
    {
        this.y = value - this._radius;
    }
}
