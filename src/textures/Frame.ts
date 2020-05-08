import { IGameObject } from '../gameobjects/IGameObject';
import { Texture } from './Texture';

export class Frame
{
    texture: Texture;
    key: string | number;

    //  This is the actual area of the texture to draw to canvas / webgl, including any extruded data.
    //  This is the same as the 'trimmed' + 'extruded' area from an atlas.
    x: number;
    y: number;
    width: number;
    height: number;

    trimmed: boolean = false;

    //  Original size of the image before being trimmed or added to an atlas (which can add extrude data to it).
    sourceSizeWidth: number;
    sourceSizeHeight: number;

    //  The size of the image having been trimmed, before being added to the atlas (i.e. doesn't have any extrusion values in it)
    spriteSourceSizeX: number;
    spriteSourceSizeY: number;
    spriteSourceSizeWidth: number;
    spriteSourceSizeHeight: number;

    pivot: { x: number; y: number };

    u0: number;
    v0: number;
    u1: number;
    v1: number;

    constructor (texture: Texture, key: string | number, x: number, y: number, width: number, height: number)
    {
        this.texture = texture;
        this.key = key;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.sourceSizeWidth = width;
        this.sourceSizeHeight = height;

        this.updateUVs();
    }

    setPivot (x: number, y: number): void
    {
        this.pivot = { x, y };
    }

    setSize (width: number, height: number): void
    {
        this.width = width;
        this.height = height;
        this.sourceSizeWidth = width;
        this.sourceSizeHeight = height;

        this.updateUVs();
    }

    setSourceSize (width: number, height: number): void
    {
        this.sourceSizeWidth = width;
        this.sourceSizeHeight = height;
    }

    setTrim (width: number, height: number, x: number, y: number, w: number, h: number): void
    {
        this.trimmed = true;

        this.sourceSizeWidth = width;
        this.sourceSizeHeight = height;

        this.spriteSourceSizeX = x;
        this.spriteSourceSizeY = y;
        this.spriteSourceSizeWidth = w;
        this.spriteSourceSizeHeight = h;
    }

    getExtent (originX: number, originY: number): { left: number; right: number; top: number; bottom: number }
    {
        const sourceSizeWidth = this.sourceSizeWidth;
        const sourceSizeHeight = this.sourceSizeHeight;

        let left: number;
        let right: number;
        let top: number;
        let bottom: number;

        if (this.trimmed)
        {
            left = this.spriteSourceSizeX - (originX * sourceSizeWidth);
            right = left + this.spriteSourceSizeWidth;

            top = this.spriteSourceSizeY - (originY * sourceSizeHeight);
            bottom = top + this.spriteSourceSizeHeight;
        }
        else
        {
            left = -originX * sourceSizeWidth;
            right = left + sourceSizeWidth;

            top = -originY * sourceSizeHeight;
            bottom = top + sourceSizeHeight;
        }

        return { left, right, top, bottom };
    }

    setExtent (child: IGameObject): void
    {
        const transform = child.transform;

        const originX = transform.origin.x;
        const originY = transform.origin.y;

        const sourceSizeWidth = this.sourceSizeWidth;
        const sourceSizeHeight = this.sourceSizeHeight;

        let x: number;
        let y: number;
        let width: number;
        let height: number;

        if (this.trimmed)
        {
            x = this.spriteSourceSizeX - (originX * sourceSizeWidth);
            y = this.spriteSourceSizeY - (originY * sourceSizeHeight);

            width = this.spriteSourceSizeWidth;
            height = this.spriteSourceSizeHeight;
        }
        else
        {
            x = -originX * sourceSizeWidth;
            y = -originY * sourceSizeHeight;

            width = sourceSizeWidth;
            height = sourceSizeHeight;
        }

        transform.setExtent(x, y, width, height);
    }

    updateUVs (): void
    {
        const { x, y, width, height } = this;

        const baseTextureWidth = this.texture.width;
        const baseTextureHeight = this.texture.height;

        this.u0 = x / baseTextureWidth;
        this.v0 = y / baseTextureHeight;

        this.u1 = (x + width) / baseTextureWidth;
        this.v1 = (y + height) / baseTextureHeight;
    }
}
