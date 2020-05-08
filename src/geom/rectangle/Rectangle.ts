/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { Contains } from './Contains';

export class Rectangle
{
    x: number;
    y: number;
    width: number;
    height: number;

    constructor (x: number = 0, y: number = 0, width: number = 0, height: number = 0)
    {
        this.set(x, y, width, height);
    }

    set (x: number = 0, y: number = 0, width: number = 0, height: number = 0): this
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;
    }

    contains (x: number, y: number): boolean
    {
        return Contains(this, x, y);
    }

    set right (value: number)
    {
        if (value <= this.x)
        {
            this.width = 0;
        }
        else
        {
            this.width = value - this.x;
        }
    }

    get right (): number
    {
        return this.x + this.width;
    }

    set bottom (value: number)
    {
        if (value <= this.y)
        {
            this.height = 0;
        }
        else
        {
            this.height = value - this.y;
        }
    }

    get bottom (): number
    {
        return this.y + this.height;
    }
}
