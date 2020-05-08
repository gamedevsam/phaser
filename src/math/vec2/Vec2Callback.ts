import { NOOP } from '../../utils/NOOP';

export class Vec2Callback
{
    private _x: number;
    private _y: number;
    callback: (vec2: Vec2Callback) => void;
    compareValue: boolean = false;

    constructor (callback: (vec2: Vec2Callback) => void, x: number = 0, y: number = 0, compareValue: boolean = false)
    {
        this._x = x;
        this._y = y;
        this.callback = callback;
        this.compareValue = compareValue;
    }

    set (x: number = 0, y: number = 0): this
    {
        this._x = x;
        this._y = y;

        this.callback(this);

        return this;
    }

    destroy (): void
    {
        this.callback = NOOP;
    }

    set x (value: number)
    {
        if (!this.compareValue || (this.compareValue && value !== this._x))
        {
            this._x = value;

            this.callback(this);
        }
    }

    get x (): number
    {
        return this._x;
    }

    set y (value: number)
    {
        if (!this.compareValue || (this.compareValue && value !== this._x))
        {
            this._y = value;

            this.callback(this);
        }
    }

    get y (): number
    {
        return this._y;
    }
}
