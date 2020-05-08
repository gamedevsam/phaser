import { GetHeight, GetResolution, GetWidth } from '../../config/Size';

import { BindingQueue } from '../BindingQueue';
import { GetBackgroundColor } from '../../config/BackgroundColor';
import { GetCanvasContext } from '../../config/CanvasContext';
import { ISceneRenderData } from '../../scenes/ISceneRenderData';
import { ISprite } from '../../gameobjects/sprite/ISprite';
import { ISpriteBatch } from '../../gameobjects/spritebatch/ISpriteBatch';

export class CanvasRenderer
{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    clearColor: string;

    width: number;
    height: number;
    resolution: number;

    textureIndex: number[];
    flushTotal: number;

    clearBeforeRender: boolean = true;
    optimizeRedraw: boolean = true;
    autoResize: boolean = true;

    constructor ()
    {
        this.width = GetWidth();
        this.height = GetHeight();
        this.resolution = GetResolution();

        this.setBackgroundColor(GetBackgroundColor());

        const canvas = document.createElement('canvas');

        this.canvas = canvas;

        this.initContext();
    }

    initContext (): void
    {
        const ctx = this.canvas.getContext('2d', GetCanvasContext());

        // GL.set(gl);

        this.ctx = ctx;

        this.resize(this.width, this.height, this.resolution);
    }

    resize (width: number, height: number, resolution: number = 1): void
    {
        this.width = width * resolution;
        this.height = height * resolution;
        this.resolution = resolution;

        const canvas = this.canvas;

        canvas.width = this.width;
        canvas.height = this.height;

        if (this.autoResize)
        {
            canvas.style.width = this.width / resolution + 'px';
            canvas.style.height = this.height / resolution + 'px';
        }
    }

    setBackgroundColor (color: number): this
    {
        const r: number = color >> 16 & 0xFF;
        const g: number = color >> 8 & 0xFF;
        const b: number = color & 0xFF;
        const a: number = (color > 16777215) ? color >>> 24 : 255;

        this.clearColor = `rgba(${r}, ${g}, ${b}, ${a})`;

        return this;
    }

    reset (): void
    {
        const ctx = this.ctx;

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    render (renderData: ISceneRenderData): void
    {
        BindingQueue.clear();

        const ctx = this.ctx;

        //  Cache 1 - Nothing dirty? Display the previous frame
        if (this.optimizeRedraw && renderData.numDirtyFrames === 0 && renderData.numDirtyCameras === 0)
        {
            return;
        }

        this.reset();

        if (this.clearBeforeRender)
        {
            ctx.clearRect(0, 0, this.width, this.height);
            ctx.fillStyle = this.clearColor;
            ctx.fillRect(0, 0, this.width, this.height);
        }

        const worlds = renderData.worldData;

        for (let i: number = 0; i < worlds.length; i++)
        {
            const { camera, renderList, numRendered } = worlds[i];

            const { a, b, c, d, tx, ty } = camera.worldTransform;

            ctx.setTransform(a, b, c, d, tx, ty);

            //  Process the render list
            for (let s: number = 0; s < numRendered; s++)
            {
                renderList[s].render(this);
            }
        }
    }

    batchSprite <T extends ISprite> (renderable: T): void
    {
        const frame = renderable.frame;

        if (!frame)
        {
            return;
        }

        const ctx = this.ctx;

        const transform = renderable.transform;

        const { a, b, c, d, tx, ty } = transform.world;
        const { x, y } = transform.extent;

        ctx.save();

        ctx.setTransform(a, b, c, d, tx, ty);

        ctx.globalAlpha = renderable.alpha;

        ctx.drawImage(frame.texture.image as HTMLImageElement, frame.x, frame.y, frame.width, frame.height, x, y, frame.width, frame.height);

        ctx.restore();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    batchSpriteBuffer <T extends ISpriteBatch> (batch: T): void
    {
        //  TODO: Implement?
    }
}
