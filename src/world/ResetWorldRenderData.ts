import { IWorldRenderData } from './IWorldRenderData';

export function ResetWorldRenderData (renderData: IWorldRenderData, gameFrame: number): void
{
    renderData.gameFrame = gameFrame;
    renderData.dirtyFrame = 0;
    renderData.numRendered = 0;
    renderData.numRenderable = 0;
    renderData.renderList.length = 0;
}
