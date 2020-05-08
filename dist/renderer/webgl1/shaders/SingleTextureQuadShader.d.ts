import { IShaderAttributes } from './IShaderAttributes';
import { IShaderConfig } from './IShaderConfig';
import { IShaderUniforms } from './IShaderUniforms';
import { WebGLRenderer } from '../WebGLRenderer';
export declare class SingleTextureQuadShader {
    renderer: WebGLRenderer;
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    attribs: IShaderAttributes;
    uniforms: IShaderUniforms;
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
    constructor(renderer: WebGLRenderer, config?: IShaderConfig);
    createBuffers(): void;
    createShaders(fragmentShaderSource: string, vertexShaderSource: string): void;
    bind(projectionMatrix: Float32Array, cameraMatrix: Float32Array): void;
    bindBuffers(indexBuffer: WebGLBuffer, vertexBuffer: WebGLBuffer): void;
    draw(count: number): void;
    flush(): boolean;
}
//# sourceMappingURL=SingleTextureQuadShader.d.ts.map