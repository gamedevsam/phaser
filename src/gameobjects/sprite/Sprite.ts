import { Container } from '../container/Container';
import { Frame } from '../../textures/Frame';
import { IGameObject } from '../IGameObject';
import { IRenderer } from '../../renderer/IRenderer';
import { ISprite } from './ISprite';
import { PackColors } from '../../renderer/webgl1/PackColors';
import { SetFrame } from './SetFrame';
import { SetTexture } from './SetTexture';
import { Texture } from '../../textures/Texture';
import { UpdateVertices } from './UpdateVertices';

export class Sprite extends Container implements ISprite
{
    texture: Texture;
    frame: Frame;
    hasTexture: boolean = false;

    vertexData: Float32Array;
    vertexColor: Uint32Array;

    vertexAlpha: Float32Array;
    vertexTint: Uint32Array;

    protected _tint: number = 0xffffff;

    constructor (x: number, y: number, texture: string | Texture, frame?: string | number)
    {
        super(x, y);

        this.type = 'Sprite';

        this.vertexData = new Float32Array(24).fill(0);
        this.vertexColor = new Uint32Array(4).fill(4294967295);

        this.vertexAlpha = new Float32Array(4).fill(1);
        this.vertexTint = new Uint32Array(4).fill(0xffffff);

        this.setTexture(texture, frame);
    }

    setTexture (key: string | Texture, frame?: string | number): this
    {
        SetTexture(key, frame, this);

        return this;
    }

    setFrame (key?: string | number | Frame): this
    {
        SetFrame(this.texture, key, this);

        return this;
    }

    isRenderable (): boolean
    {
        return (this.visible && this.willRender && this.hasTexture && this.alpha > 0);
    }

    render <T extends IRenderer> (renderer: T): void
    {
        const dirty = this.dirty;

        if (dirty.pendingRender)
        {
            if (dirty.colors)
            {
                PackColors(this);

                dirty.colors = false;
            }

            if (dirty.render)
            {
                UpdateVertices(this);

                dirty.render = false;
            }

            renderer.batchSprite(this);

            dirty.pendingRender = false;
        }
        else if (dirty.postRender)
        {
            this.postRender(renderer);

            dirty.postRender = false;
        }
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

            const vertexAlpha = this.vertexAlpha;

            vertexAlpha[0] = value;
            vertexAlpha[1] = value;
            vertexAlpha[2] = value;
            vertexAlpha[3] = value;

            this.dirty.setColors();
        }
    }

    get tint (): number
    {
        return this._tint;
    }

    set tint (value: number)
    {
        if (value !== this._tint)
        {
            this._tint = value;

            const vertexTint = this.vertexTint;

            vertexTint[0] = value;
            vertexTint[1] = value;
            vertexTint[2] = value;
            vertexTint[3] = value;

            this.dirty.setColors();
        }
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        this.texture = null;
        this.frame = null;
        this.hasTexture = false;
        this.vertexData = null;
        this.vertexColor = null;
        this.vertexAlpha = null;
        this.vertexTint = null;
    }
}
