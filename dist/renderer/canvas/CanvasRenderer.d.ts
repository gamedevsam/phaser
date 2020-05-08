import { ISceneRenderData } from '../../scenes/ISceneRenderData';
export declare class CanvasRenderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    clearColor: string;
    width: number;
    height: number;
    resolution: number;
    clearBeforeRender: boolean;
    optimizeRedraw: boolean;
    autoResize: boolean;
    constructor();
    initContext(): void;
    resize(width: number, height: number, resolution?: number): void;
    setBackgroundColor(color: number): this;
    reset(): void;
    render(renderData: ISceneRenderData): void;
}
//# sourceMappingURL=CanvasRenderer.d.ts.map