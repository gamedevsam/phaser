import { GL } from '../GL';
import { GetMaxTextures } from '../../../config/MaxTextures';
import { IRenderer } from '../../IRenderer';
import { IShaderAttributes } from './IShaderAttributes';
import { IShaderConfig } from './IShaderConfig';
import { IShaderUniforms } from './IShaderUniforms';

const shaderSource = {

    fragmentShader: `
precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture[%count%];

void main (void)
{
    vec4 color;
    %forloop%

    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);
}`,

    vertexShader: `
precision highp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute float aTextureId;
attribute vec4 aTintColor;

uniform mat4 uProjectionMatrix;
uniform mat4 uCameraMatrix;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

void main (void)
{
    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vTintColor = aTintColor;

    gl_Position = uProjectionMatrix * uCameraMatrix * vec4(aVertexPosition, 0.0, 1.0);
}`
};

export class MultiTextureQuadShader
{
    gl: WebGLRenderingContext;

    program: WebGLProgram;

    attribs: IShaderAttributes = { aVertexPosition: 0, aTextureCoord: 0, aTextureId: 0, aTintColor: 0 };
    uniforms: IShaderUniforms = { uProjectionMatrix: 0, uCameraMatrix: 0, uTexture: 0 };

    /**
     * Maximum number of quads per batch before a flush takes place.
     *
     * @type {number}
     * @memberof MultiTextureQuadShader
     */
    batchSize: number;

    /**
     * The size, in bytes, per entry in the array buffer.
     *
     * @type {number}
     * @memberof MultiTextureQuadShader
     */
    dataSize: number = 4;

    /**
     * The size, in bytes, per entry in the element index array.
     *
     * @type {number}
     * @memberof MultiTextureQuadShader
     */
    indexSize: number = 4;

    /**
     * The amount of elements / floats a single vertex consists of.
     *
     * The default is 6:
     *
     * position (x,y - 2 floats)
     * texture coord (x,y - 2 floats)
     * texture index (float)
     * packed color (vec4)
     *
     * @type {number}
     * @memberof MultiTextureQuadShader
     */
    vertexElementSize: number = 6;

    /**
     * The size, in bytes, of a single vertex in the array buffer.
     *
     * This is `vertexElementSize * dataSize`.
     *
     * @type {number}
     * @memberof MultiTextureQuadShader
     */
    vertexByteSize: number = 6 * 4;

    /**
     * The size, in bytes, of a single quad in the array buffer.
     *
     * This is `vertexByteSize * 4`.
     *
     * @type {number}
     * @memberof MultiTextureQuadShader
     */
    quadByteSize: number = 6 * 4 * 4;

    /**
     * The size, in quantity of elements, of a single quad in the element index array.
     *
     * This is `vertexElementSize * 4`.
     *
     * @type {number}
     * @memberof MultiTextureQuadShader
     */
    quadElementSize: number = 6 * 4;

    /**
     * The total number of entries per quad in the element index array.
     *
     * The IBO contains 6 entries per quad:
     *
     * 0, 1, 2
     * 2, 3, 0
     *
     * @type {number}
     * @memberof MultiTextureQuadShader
     */
    quadIndexSize: number = 6;

    /**
     * The size, in bytes, of the Array Buffer.
     *
     * @type {number}
     * @memberof MultiTextureQuadShader
     */
    bufferByteSize: number;

    /**
     * The Array Buffer.
     *
     * @type {ArrayBuffer}
     * @memberof MultiTextureQuadShader
     */
    data: ArrayBuffer;

    /**
     * Float32 View of the Array Buffer.
     *
     * @type {Float32Array}
     * @memberof MultiTextureQuadShader
     */
    vertexViewF32: Float32Array;

    /**
     * Uint32 View of the Array Buffer.
     *
     * @type {Uint32Array}
     * @memberof MultiTextureQuadShader
     */
    vertexViewU32: Uint32Array;

    /**
     * The Element Array Buffer.
     *
     * @type {Uint16Array}
     * @memberof MultiTextureQuadShader
     */
    index: Uint16Array;

    /**
     * The data array buffer.
     *
     * @type {WebGLBuffer}
     * @memberof MultiTextureQuadShader
     */
    vertexBuffer: WebGLBuffer;

    /**
     * The element array buffer.
     *
     * @type {WebGLBuffer}
     * @memberof MultiTextureQuadShader
     */
    indexBuffer: WebGLBuffer;

    /**
     * The total number of quads added to the batch so far.
     * Reset every bind and flush.
     *
     * @type {number}
     * @memberof MultiTextureQuadShader
     */
    count: number;

    //  The number of quads previously flushed
    prevCount: number;

    constructor (config: IShaderConfig = {})
    {
        this.gl = GL.get();

        const {
            batchSize = 4096,
            fragmentShader = shaderSource.fragmentShader,
            vertexShader = shaderSource.vertexShader
        } = config;

        this.batchSize = batchSize;
        this.bufferByteSize = batchSize * this.quadByteSize;

        this.createBuffers();
        this.createShaders(fragmentShader, vertexShader);

        this.count = 0;
    }

    createBuffers (): void
    {
        let ibo: number[] = [];

        //  Seed the index buffer
        for (let i = 0; i < (this.batchSize * this.indexSize); i += this.indexSize)
        {
            ibo.push(i + 0, i + 1, i + 2, i + 2, i + 3, i + 0);
        }

        this.data = new ArrayBuffer(this.bufferByteSize);
        this.index = new Uint16Array(ibo);

        this.vertexViewF32 = new Float32Array(this.data);
        this.vertexViewU32 = new Uint32Array(this.data);

        const gl = this.gl;

        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.DYNAMIC_DRAW);

        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.index, gl.STATIC_DRAW);

        //  Tidy-up
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        ibo = [];
    }

    createShaders (fragmentShaderSource: string, vertexShaderSource: string): void
    {
        const gl = this.gl;
        const maxTextures = GetMaxTextures();

        let src = '';

        if (maxTextures > 1)
        {
            for (let i = 0; i < maxTextures; i++)
            {
                if (i > 0)
                {
                    src += '\nelse ';
                }

                if (i < maxTextures - 1)
                {
                    src += `if (vTextureId < ${i}.5)`;
                }

                src += '\n{';
                src += `\n  color = texture2D(uTexture[${i}], vTextureCoord);`;
                src += '\n}';
            }
        }
        else
        {
            src = 'color = texture2D(uTexture[0], vTextureCoord);';
        }

        fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);
        fragmentShaderSource = fragmentShaderSource.replace(/%forloop%/gi, src);

        //  Create the shaders

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);

        const vertexShader = gl.createShader(gl.VERTEX_SHADER);

        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);

        const program = gl.createProgram();

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        gl.useProgram(program);

        this.program = program;

        for (const key of Object.keys(this.attribs) as Array<keyof IShaderAttributes>)
        {
            const location = gl.getAttribLocation(program, key);

            gl.enableVertexAttribArray(location);

            this.attribs[key] = location;
        }

        for (const key of Object.keys(this.uniforms) as Array<keyof IShaderUniforms>)
        {
            this.uniforms[key] = gl.getUniformLocation(program, key);
        }
    }

    bind (renderer: IRenderer, projectionMatrix: Float32Array, cameraMatrix: Float32Array): void
    {
        const gl = this.gl;
        const uniforms = this.uniforms;

        gl.useProgram(this.program);

        gl.uniformMatrix4fv(uniforms.uProjectionMatrix, false, projectionMatrix);
        gl.uniformMatrix4fv(uniforms.uCameraMatrix, false, cameraMatrix);
        gl.uniform1iv(uniforms.uTexture, renderer.textureIndex);

        this.bindBuffers(this.indexBuffer, this.vertexBuffer);
    }

    bindBuffers (indexBuffer: WebGLBuffer, vertexBuffer: WebGLBuffer): void
    {
        const gl = this.gl;
        const stride = this.vertexByteSize;
        const attribs = this.attribs;

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

        //  attributes must be reset whenever you change buffers

        gl.vertexAttribPointer(attribs.aVertexPosition, 2, gl.FLOAT, false, stride, 0);     // size = 8
        gl.vertexAttribPointer(attribs.aTextureCoord, 2, gl.FLOAT, false, stride, 8);       // size = 8, offset = position
        gl.vertexAttribPointer(attribs.aTextureId, 1, gl.FLOAT, false, stride, 16);         // size = 4, offset = position + tex coord
        gl.vertexAttribPointer(attribs.aTintColor, 4, gl.UNSIGNED_BYTE, true, stride, 20);  // size = 4, offset = position + tex coord + index

        this.count = 0;
    }

    draw (count: number): void
    {
        const gl = this.gl;
        const offset = count * this.quadByteSize;

        if (offset === this.bufferByteSize)
        {
            gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.DYNAMIC_DRAW);
        }
        else
        {
            const view = this.vertexViewF32.subarray(0, offset);

            gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
        }

        gl.drawElements(gl.TRIANGLES, count * this.quadIndexSize, gl.UNSIGNED_SHORT, 0);
    }

    flush (renderer: IRenderer): boolean
    {
        const count = this.count;

        if (count === 0)
        {
            return false;
        }

        this.draw(count);

        this.prevCount = count;

        this.count = 0;

        renderer.flushTotal++;

        return true;
    }
}
