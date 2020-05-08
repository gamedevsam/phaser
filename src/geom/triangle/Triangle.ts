/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Contains } from './Contains';

/**
 * @classdesc
 * A triangle is a plane created by connecting three points.
 * The first two arguments specify the first point, the middle two arguments
 * specify the second point, and the last two arguments specify the third point.
 *
 * @class Triangle
 * @memberof Phaser.Geom
 * @constructor
 * @since 3.0.0
 *
 * @param {number} [x1=0] - `x` coordinate of the first point.
 * @param {number} [y1=0] - `y` coordinate of the first point.
 * @param {number} [x2=0] - `x` coordinate of the second point.
 * @param {number} [y2=0] - `y` coordinate of the second point.
 * @param {number} [x3=0] - `x` coordinate of the third point.
 * @param {number} [y3=0] - `y` coordinate of the third point.
 */
export class Triangle
{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;

    constructor (x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0, x3: number = 0, y3: number = 0)
    {
        this.set(x1, y1, x2, y2, x3, y3);
    }

    set (x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0, x3: number = 0, y3: number = 0): this
    {
        this.x1 = x1;
        this.y1 = y1;

        this.x2 = x2;
        this.y2 = y2;

        this.x3 = x3;
        this.y3 = y3;

        return this;
    }

    contains (x: number, y: number): boolean
    {
        return Contains(this, x, y);
    }

    get left (): number
    {
        return Math.min(this.x1, this.x2, this.x3);
    }

    set left (value: number)
    {
        let diff = 0;

        if (this.x1 <= this.x2 && this.x1 <= this.x3)
        {
            diff = this.x1 - value;
        }
        else if (this.x2 <= this.x1 && this.x2 <= this.x3)
        {
            diff = this.x2 - value;
        }
        else
        {
            diff = this.x3 - value;
        }

        this.x1 -= diff;
        this.x2 -= diff;
        this.x3 -= diff;
    }

    get right (): number
    {
        return Math.max(this.x1, this.x2, this.x3);
    }

    set right (value: number)
    {
        let diff = 0;

        if (this.x1 >= this.x2 && this.x1 >= this.x3)
        {
            diff = this.x1 - value;
        }
        else if (this.x2 >= this.x1 && this.x2 >= this.x3)
        {
            diff = this.x2 - value;
        }
        else
        {
            diff = this.x3 - value;
        }

        this.x1 -= diff;
        this.x2 -= diff;
        this.x3 -= diff;
    }

    get top (): number
    {
        return Math.min(this.y1, this.y2, this.y3);
    }

    set top (value: number)
    {
        let diff = 0;

        if (this.y1 <= this.y2 && this.y1 <= this.y3)
        {
            diff = this.y1 - value;
        }
        else if (this.y2 <= this.y1 && this.y2 <= this.y3)
        {
            diff = this.y2 - value;
        }
        else
        {
            diff = this.y3 - value;
        }

        this.y1 -= diff;
        this.y2 -= diff;
        this.y3 -= diff;
    }

    get bottom (): number
    {
        return Math.max(this.y1, this.y2, this.y3);
    }

    set bottom (value: number)
    {
        let diff = 0;

        if (this.y1 >= this.y2 && this.y1 >= this.y3)
        {
            diff = this.y1 - value;
        }
        else if (this.y2 >= this.y1 && this.y2 >= this.y3)
        {
            diff = this.y2 - value;
        }
        else
        {
            diff = this.y3 - value;
        }

        this.y1 -= diff;
        this.y2 -= diff;
        this.y3 -= diff;
    }
}
