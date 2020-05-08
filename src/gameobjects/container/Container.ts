import { GameObject } from '../GameObject';
import { IContainer } from './IContainer';

export class Container extends GameObject implements IContainer
{
    protected _alpha: number = 1;

    constructor (x: number = 0, y: number = 0)
    {
        super(x, y);

        this.type = 'Container';
    }

    setSize (width: number, height: number): this
    {
        this.transform.updateExtent(width, height);

        return this;
    }

    setPosition (x: number, y: number): this
    {
        this.transform.position.set(x, y);

        return this;
    }

    setOrigin (x: number, y: number): this
    {
        this.transform.origin.set(x, y);

        return this;
    }

    setSkew (x: number, y: number): this
    {
        this.transform.skew.set(x, y);

        return this;
    }

    setScale (x: number, y: number): this
    {
        this.transform.scale.set(x, y);

        return this;
    }

    setRotation (value: number): this
    {
        this.transform.rotation = value;

        return this;
    }

    set width (value: number)
    {
        this.transform.updateExtent(value);
    }

    get width (): number
    {
        return this.transform.extent.width;
    }

    set height (value: number)
    {
        this.transform.updateExtent(undefined, value);
    }

    get height (): number
    {
        return this.transform.extent.height;
    }

    set x (value: number)
    {
        this.transform.position.x = value;
    }

    get x (): number
    {
        return this.transform.position.x;
    }

    set y (value: number)
    {
        this.transform.position.y = value;
    }

    get y (): number
    {
        return this.transform.position.y;
    }

    set originX (value: number)
    {
        this.transform.origin.x = value;
    }

    get originX (): number
    {
        return this.transform.origin.x;
    }

    set originY (value: number)
    {
        this.transform.origin.y = value;
    }

    get originY (): number
    {
        return this.transform.origin.y;
    }

    set skewX (value: number)
    {
        this.transform.skew.x = value;
    }

    get skewX (): number
    {
        return this.transform.skew.x;
    }

    set skewY (value: number)
    {
        this.transform.skew.y = value;
    }

    get skewY (): number
    {
        return this.transform.skew.y;
    }

    set scaleX (value: number)
    {
        this.transform.scale.x = value;
    }

    get scaleX (): number
    {
        return this.transform.scale.x;
    }

    set scaleY (value: number)
    {
        this.transform.scale.y = value;
    }

    get scaleY (): number
    {
        return this.transform.scale.y;
    }

    set rotation (value: number)
    {
        this.transform.rotation = value;
    }

    get rotation (): number
    {
        return this.transform.rotation;
    }

    get alpha (): number
    {
        return this._alpha;
    }

    set alpha (value: number)
    {
        if (value !== this._alpha)
        {
            this._alpha = value;

            this.dirty.setRender();
        }
    }
}
