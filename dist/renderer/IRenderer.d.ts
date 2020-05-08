import { ISceneRenderData } from '../scenes/ISceneRenderData';
export interface IRenderer {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    resolution: number;
    render(renderData: ISceneRenderData): void;
}
//# sourceMappingURL=IRenderer.d.ts.map