import { Clamp } from '../../math/Clamp';
import { DeleteFramebuffer } from '../../renderer/webgl1/DeleteFramebuffer';
import { Frame } from '../../textures';
import { GL } from '../../renderer/webgl1/GL';
import { GetVerticesFromValues } from '../components/transform/GetVerticesFromValues';
import { IRenderer } from '../../renderer/IRenderer';
import { ISpriteBatch } from './ISpriteBatch';
import { Layer } from '../layer/Layer';
import { PackColor } from '../../renderer/webgl1/PackColor';
import { SpriteBatchAddConfig } from './SpriteBatchAddConfig';
import { Texture } from '../../textures/Texture';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance';

export class SpriteBatch extends Layer implements ISpriteBatch
{
    data: ArrayBuffer;
    vertexViewF32: Float32Array;
    vertexViewU32: Uint32Array;
    index: Uint16Array;

    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;

    count: number;
    maxSize: number;
    glTextureIndex: number = 0;

    texture: Texture;
    hasTexture: boolean = false;

    constructor (maxSize: number, texture: string | Texture)
    {
        super();

        this.type = 'SpriteBatch';
        this.willRender = true;

        this.setTexture(texture);
        this.setMaxSize(maxSize);
    }

    resetBuffers (): void
    {
        let ibo: number[] = [];

        //  Seed the index buffer
        for (let i = 0; i < (this.maxSize * 4); i += 4)
        {
            ibo.push(i + 0, i + 1, i + 2, i + 2, i + 3, i + 0);
        }

        //  96 = The size, in bytes, of a single quad in the array buffer
        this.data = new ArrayBuffer(this.maxSize * 96);
        this.index = new Uint16Array(ibo);

        this.vertexViewF32 = new Float32Array(this.data);
        this.vertexViewU32 = new Uint32Array(this.data);

        const gl = GL.get();

        if (gl)
        {
            DeleteFramebuffer(this.vertexBuffer);
            DeleteFramebuffer(this.indexBuffer);

            this.vertexBuffer = gl.createBuffer();
            this.indexBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index, gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }

        //  Tidy-up
        ibo = [];

        this.count = 0;
    }

    setMaxSize (value: number): this
    {
        this.maxSize = Clamp(value, 0, 65535);

        this.resetBuffers();

        return this;
    }

    setTexture (key: string | Texture): this
    {
        let texture: Texture;

        if (key instanceof Texture)
        {
            texture = key;
        }
        else
        {
            texture = TextureManagerInstance.get().get(key);
        }

        if (!texture)
        {
            console.warn('Invalid Texture key: ' + key);
        }
        else
        {
            this.texture = texture;

            this.hasTexture = true;

            this.glTextureIndex = -1;
        }

        return this;
    }

    isRenderable (): boolean
    {
        return (this.visible && this.willRender && this.hasTexture && this.count > 0);
    }

    clear (): this
    {
        this.count = 0;

        return this;
    }

    private addToBatch (frame: Frame, color: number, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): this
    {
        if (this.count >= this.maxSize)
        {
            console.warn('SpriteBatch full');
            return this;
        }

        const { u0, u1, v0, v1 } = frame;

        const F32 = this.vertexViewF32;
        const U32 = this.vertexViewU32;
        const offset = this.count * 24;
        const textureIndex = (this.texture.binding) ? this.texture.binding.index : 0;

        //  top left
        F32[offset + 0] = x0;
        F32[offset + 1] = y0;
        F32[offset + 2] = u0;
        F32[offset + 3] = v0;
        F32[offset + 4] = textureIndex;
        U32[offset + 5] = color;

        //  bottom left
        F32[offset + 6] = x1;
        F32[offset + 7] = y1;
        F32[offset + 8] = u0;
        F32[offset + 9] = v1;
        F32[offset + 10] = textureIndex;
        U32[offset + 11] = color;

        //  bottom right
        F32[offset + 12] = x2;
        F32[offset + 13] = y2;
        F32[offset + 14] = u1;
        F32[offset + 15] = v1;
        F32[offset + 16] = textureIndex;
        U32[offset + 17] = color;

        //  top right
        F32[offset + 18] = x3;
        F32[offset + 19] = y3;
        F32[offset + 20] = u1;
        F32[offset + 21] = v0;
        F32[offset + 22] = textureIndex;
        U32[offset + 23] = color;

        this.dirty.setRender();

        this.count++;

        return this;
    }

    add (config: SpriteBatchAddConfig): this
    {
        const {
            frame = null,
            x = 0,
            y = 0,
            rotation = 0,
            scaleX = 1,
            scaleY = 1,
            skewX = 0,
            skewY = 0,
            originX = 0,
            originY = 0,
            alpha = 1,
            tint = 0xffffff
        } = config;

        const textureFrame = this.texture.getFrame(frame);

        const { left, right, top, bottom } = textureFrame.getExtent(originX, originY);
        const { x0, y0, x1, y1, x2, y2, x3, y3 } = GetVerticesFromValues(left, right, top, bottom, x, y, rotation, scaleX, scaleY, skewX, skewY);

        const packedColor = PackColor(tint, alpha);

        return this.addToBatch(textureFrame, packedColor, x0, y0, x1, y1, x2, y2, x3, y3);
    }

    addXY (x: number, y: number, frame?: string | number): this
    {
        const textureFrame = this.texture.getFrame(frame);

        const { left, right, top, bottom } = textureFrame.getExtent(0, 0);
        const { x0, y0, x1, y1, x2, y2, x3, y3 } = GetVerticesFromValues(left, right, top, bottom, x, y);

        return this.addToBatch(textureFrame, 4294967295, x0, y0, x1, y1, x2, y2, x3, y3);
    }

    updateTextureIndex (): void
    {
        const textureIndex = this.texture.binding.index;

        if (textureIndex === this.glTextureIndex)
        {
            return;
        }

        const F32 = this.vertexViewF32;

        this.glTextureIndex = textureIndex;

        for (let i = 0; i < this.count; i++)
        {
            F32[(i * 24) + 4] = textureIndex;
            F32[(i * 24) + 10] = textureIndex;
            F32[(i * 24) + 16] = textureIndex;
            F32[(i * 24) + 22] = textureIndex;
        }
    }

    render <T extends IRenderer> (renderer: T): void
    {
        renderer.batchSpriteBuffer(this);
    }

    destroy (): void
    {
        super.destroy();

        DeleteFramebuffer(this.vertexBuffer);
        DeleteFramebuffer(this.indexBuffer);

        this.data = null;
        this.vertexViewF32 = null;
        this.vertexViewU32 = null;
        this.index = null;
        this.texture = null;
        this.hasTexture = false;
    }
}
