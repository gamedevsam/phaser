import { GetHeight, GetResolution, GetWidth } from '../../config/Size';
import { GetMaxTextures, MaxTextures, SetMaxTextures } from '../../config/MaxTextures';

import { BindingQueue } from '../BindingQueue';
import { CheckShaderMaxIfStatements } from './shaders/CheckShaderMaxIfStatements';
import { GL } from './GL';
import { GLTextureBinding } from '../../textures';
import { GetBackgroundColor } from '../../config/BackgroundColor';
import { GetWebGLContext } from '../../config/WebGLContext';
import { IBaseCamera } from '../../camera/IBaseCamera';
import { ISceneRenderData } from '../../scenes/ISceneRenderData';
import { IShader } from './shaders/IShader';
import { ISprite } from '../../gameobjects/sprite/ISprite';
import { ISpriteBatch } from '../../gameobjects/spritebatch/ISpriteBatch';
import { ExactEquals as Matrix2dEqual } from '../../math/matrix2d-funcs/ExactEquals';
import { MultiTextureQuadShader } from './shaders/MultiTextureQuadShader';
import { Ortho } from './Ortho';
import { Texture } from '../../textures/Texture';

export class WebGLRenderer
{
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;

    clearColor = [ 0, 0, 0, 1 ];

    shader: IShader;

    width: number;
    height: number;
    resolution: number;

    projectionMatrix: Float32Array;
    textureIndex: number[];
    flushTotal: number = 0;

    maxTextures: number = 0;
    activeTextures: Texture[];
    currentActiveTexture: number = 0;
    startActiveTexture: number = 0;
    tempTextures: WebGLTexture[] = [];

    clearBeforeRender: boolean = true;
    optimizeRedraw: boolean = true;
    autoResize: boolean = true;

    contextLost: boolean = false;

    prevCamera: IBaseCamera = null;

    elementIndexExtension: OES_element_index_uint;

    constructor ()
    {
        this.width = GetWidth();
        this.height = GetHeight();
        this.resolution = GetResolution();

        this.setBackgroundColor(GetBackgroundColor());

        const canvas = document.createElement('canvas');

        canvas.addEventListener('webglcontextlost', (event) => this.onContextLost(event), false);
        canvas.addEventListener('webglcontextrestored', () => this.onContextRestored(), false);

        this.canvas = canvas;

        this.initContext();

        //  TODO - If maxTexture = 1 then use single quad shader
        this.shader = new MultiTextureQuadShader();
    }

    initContext (): void
    {
        const gl = this.canvas.getContext('webgl', GetWebGLContext());

        GL.set(gl);

        this.gl = gl;

        this.elementIndexExtension = gl.getExtension('OES_element_index_uint');

        this.getMaxTextures();

        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);

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

        this.gl.viewport(0, 0, this.width, this.height);

        this.projectionMatrix = Ortho(width, height);
    }

    onContextLost (event: Event): void
    {
        event.preventDefault();

        this.contextLost = true;
    }

    onContextRestored (): void
    {
        this.contextLost = false;

        this.initContext();
    }

    setBackgroundColor (color: number): this
    {
        const clearColor = this.clearColor;

        const r: number = color >> 16 & 0xFF;
        const g: number = color >> 8 & 0xFF;
        const b: number = color & 0xFF;
        const a: number = (color > 16777215) ? color >>> 24 : 255;

        clearColor[0] = r / 255;
        clearColor[1] = g / 255;
        clearColor[2] = b / 255;
        clearColor[3] = a / 255;

        return this;
    }

    private getMaxTextures (): void
    {
        const gl = this.gl;

        let maxGPUTextures: number = CheckShaderMaxIfStatements(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS), gl);

        const maxConfigTextures = GetMaxTextures();

        if (maxConfigTextures === 0 || (maxConfigTextures > 0 && maxConfigTextures > maxGPUTextures))
        {
            //  Insert gpu limit into config value
            SetMaxTextures(maxGPUTextures);
        }
        else if (maxConfigTextures > 0 && maxConfigTextures < maxGPUTextures)
        {
            //  Limit to config setting
            maxGPUTextures = maxConfigTextures;
        }

        const tempTextures = this.tempTextures;

        if (tempTextures.length)
        {
            tempTextures.forEach(texture =>
            {
                gl.deleteTexture(texture);
            });
        }

        //  Create temp textures to stop WebGL errors on mac os
        for (let texturesIndex: number = 0; texturesIndex < maxGPUTextures; texturesIndex++)
        {
            const tempTexture = gl.createTexture();

            gl.activeTexture(gl.TEXTURE0 + texturesIndex);

            gl.bindTexture(gl.TEXTURE_2D, tempTexture);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([ 0, 0, 255, 255 ]));

            tempTextures[texturesIndex] = tempTexture;
        }

        this.maxTextures = maxGPUTextures;

        this.textureIndex = Array.from(Array(maxGPUTextures).keys());
        this.activeTextures = Array(maxGPUTextures);

        this.currentActiveTexture = 0;
    }

    reset (framebuffer: WebGLFramebuffer = null, width: number = this.width, height: number = this.height): void
    {
        const gl = this.gl;

        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.viewport(0, 0, width, height);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        this.currentActiveTexture = 0;
        this.startActiveTexture++;
        this.flushTotal = 0;
    }

    render (renderData: ISceneRenderData): void
    {
        if (this.contextLost)
        {
            return;
        }

        const gl = this.gl;

        const queue = BindingQueue.get();

        for (let i = 0; i < queue.length; i++)
        {
            const texture = queue[i];

            if (!texture.binding)
            {
                texture.binding = new GLTextureBinding(texture);
            }
        }

        BindingQueue.clear();

        //  This is only here because if we don't do _something_ with the context, GL Spector can't see it.
        //  Technically, we could move it below the dirty bail-out below.
        this.reset();

        //  Cache 1 - Nothing dirty? Display the previous frame
        if (this.optimizeRedraw && renderData.numDirtyFrames === 0 && renderData.numDirtyCameras === 0)
        {
            return;
        }

        const shader = this.shader;
        const cls = this.clearColor;

        if (this.clearBeforeRender)
        {
            gl.clearColor(cls[0], cls[1], cls[2], cls[3]);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        const projectionMatrix = this.projectionMatrix;

        //  Cache 2 - Only one dirty camera and one flush? We can re-use the buffers
        /*
        const flushTotal = this.flushTotal;
        if (dirtyCameras === 1 && dirtyFrame === 0 && flushTotal === 1)
        {
            //  Total items rendered in the previous frame
            const count = shader.prevCount;

            shader.bind(projectionMatrix, sceneList[0].matrix);

            shader.draw(count);

            shader.prevCount = count;

            this.flushTotal = 1;

            return;
        }
        */

        this.prevCamera = null;

        const worlds = renderData.worldData;

        for (let i: number = 0; i < worlds.length; i++)
        {
            const { camera, renderList, numRendered } = worlds[i];

            //  This only needs rebinding if the camera matrix is different to before
            if (!this.prevCamera || !Matrix2dEqual(camera.worldTransform, this.prevCamera.worldTransform))
            {
                shader.flush(this);

                shader.bind(this, projectionMatrix, camera.matrix);

                this.prevCamera = camera;
            }

            //  Process the render list
            for (let s: number = 0; s < numRendered; s++)
            {
                renderList[s].render(this);
            }
        }

        //  One final sweep
        shader.flush(this);
    }

    setShader (newShader: IShader): void
    {
        this.shader.flush(this);

        newShader.bind(this, this.projectionMatrix, this.prevCamera.matrix);
    }

    resetShader (): void
    {
        this.shader.bind(this, this.projectionMatrix, this.prevCamera.matrix);
    }

    resetTextures (texture?: Texture): void
    {
        const gl = this.gl;
        const active = this.activeTextures;

        active.fill(null);

        this.currentActiveTexture = 0;
        this.startActiveTexture++;

        if (texture)
        {
            //  Set this texture as texture0
            active[0] = texture;

            texture.binding.setIndex(0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture.binding.texture);

            this.currentActiveTexture = 1;
        }
    }

    requestTexture (texture: Texture): void
    {
        const gl = this.gl;
        const binding = texture.binding;

        binding.indexCounter = this.startActiveTexture;

        if (this.currentActiveTexture < this.maxTextures)
        {
            //  Make this texture active
            this.activeTextures[this.currentActiveTexture] = texture;

            binding.setIndex(this.currentActiveTexture);

            gl.activeTexture(gl.TEXTURE0 + this.currentActiveTexture);
            gl.bindTexture(gl.TEXTURE_2D, binding.texture);

            this.currentActiveTexture++;
        }
        else
        {
            //  We're out of textures, so flush the batch and reset them all
            this.shader.flush(this);

            this.resetTextures(texture);
        }
    }

    batchSprite <T extends ISprite> (sprite: T): void
    {
        const texture = sprite.texture;
        const shader = this.shader;
        const binding = texture.binding;

        if (binding.indexCounter < this.startActiveTexture)
        {
            this.requestTexture(texture);
        }

        if (shader.count === shader.batchSize)
        {
            shader.flush(this);
        }

        const data = sprite.vertexData;
        const textureIndex = binding.index;

        //  Inject the texture ID
        data[4] = textureIndex;
        data[10] = textureIndex;
        data[16] = textureIndex;
        data[22] = textureIndex;

        const offset = shader.count * shader.quadElementSize;

        //  Copy the data to the array buffer
        shader.vertexViewF32.set(data, offset);

        const color = sprite.vertexColor;
        const U32 = shader.vertexViewU32;

        //  Copy the vertex colors to the Uint32 view (as the data copy above overwrites them)
        U32[offset + 5] = color[0];
        U32[offset + 11] = color[2];
        U32[offset + 17] = color[3];
        U32[offset + 23] = color[1];

        shader.count++;
    }

    batchSpriteBuffer <T extends ISpriteBatch> (batch: T): void
    {
        const texture = batch.texture;
        const shader = this.shader;
        const binding = texture.binding;

        shader.flush(this);

        if (binding.indexCounter < this.startActiveTexture)
        {
            this.requestTexture(texture);
        }

        batch.updateTextureIndex();

        const gl = this.gl;

        shader.bindBuffers(batch.indexBuffer, batch.vertexBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, batch.data, gl.STATIC_DRAW);

        gl.drawElements(gl.TRIANGLES, batch.count * shader.quadIndexSize, gl.UNSIGNED_SHORT, 0);

        shader.prevCount = batch.count;

        this.flushTotal++;

        //  Restore
        shader.bindBuffers(shader.indexBuffer, shader.vertexBuffer);
    }
}
