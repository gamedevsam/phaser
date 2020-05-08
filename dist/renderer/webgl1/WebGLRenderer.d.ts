import { ISceneRenderData } from '../../scenes/ISceneRenderData';
import { IShader } from './shaders/IShader';
import { Texture } from '../../textures/Texture';
export declare class WebGLRenderer {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    clearColor: number[];
    shader: IShader;
    width: number;
    height: number;
    resolution: number;
    projectionMatrix: Float32Array;
    textureIndex: number[];
    flushTotal: number;
    maxTextures: number;
    activeTextures: Texture[];
    currentActiveTexture: number;
    startActiveTexture: number;
    tempTextures: WebGLTexture[];
    clearBeforeRender: boolean;
    optimizeRedraw: boolean;
    autoResize: boolean;
    contextLost: boolean;
    elementIndexExtension: OES_element_index_uint;
    constructor();
    initContext(): void;
    resize(width: number, height: number, resolution?: number): void;
    onContextLost(event: Event): void;
    onContextRestored(): void;
    setBackgroundColor(color: number): this;
    private getMaxTextures;
    reset(framebuffer?: WebGLFramebuffer, width?: number, height?: number): void;
    render(renderData: ISceneRenderData): void;
    resetTextures(texture?: Texture): void;
    requestTexture(texture: Texture): void;
}
//# sourceMappingURL=WebGLRenderer.d.ts.map