import { IRenderer } from '../../IRenderer';

export interface IShader
{
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    batchSize: number;
    dataSize: number;
    indexSize: number;
    vertexElementSize: number;
    vertexByteSize: number;
    quadByteSize: number;
    quadElementSize: number;
    quadIndexSize: number;
    bufferByteSize: number;
    data: ArrayBuffer;
    vertexViewF32: Float32Array;
    vertexViewU32: Uint32Array;
    index: Uint16Array;
    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    count: number;
    prevCount: number;
    createBuffers (): void;
    createShaders (fragmentShaderSource: string, vertexShaderSource: string): void;
    bind (renderer: IRenderer, projectionMatrix: Float32Array, cameraMatrix: Float32Array): void;
    bindBuffers (indexBuffer: WebGLBuffer, vertexBuffer: WebGLBuffer): void;
    draw (count: number): void;
    flush (renderer: IRenderer): boolean;
}
