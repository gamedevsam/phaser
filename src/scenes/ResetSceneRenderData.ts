import { ISceneRenderData } from './ISceneRenderData';

export function ResetSceneRenderData (renderData: ISceneRenderData, gameFrame: number = 0): void
{
    renderData.gameFrame = gameFrame;
    renderData.numTotalFrames = 0;
    renderData.numDirtyFrames = 0;
    renderData.numDirtyCameras = 0;
    renderData.worldData.length = 0;
}
