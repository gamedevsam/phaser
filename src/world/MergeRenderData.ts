import { ISceneRenderData } from '../scenes/ISceneRenderData';
import { IWorldRenderData } from './IWorldRenderData';

export function MergeRenderData (sceneRenderData: ISceneRenderData, worldRenderData: IWorldRenderData): void
{
    sceneRenderData.numDirtyFrames += worldRenderData.dirtyFrame;
    sceneRenderData.numTotalFrames += worldRenderData.numRendered;

    if (worldRenderData.camera.dirtyRender)
    {
        sceneRenderData.numDirtyCameras++;
    }

    sceneRenderData.worldData.push(worldRenderData);
}
