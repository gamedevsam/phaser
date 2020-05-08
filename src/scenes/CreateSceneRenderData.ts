import { ISceneRenderData } from './ISceneRenderData';

export function CreateSceneRenderData (): ISceneRenderData
{
    return {
        gameFrame: 0,
        numTotalFrames: 0,
        numDirtyFrames: 0,
        numDirtyCameras: 0,
        worldData: []
    };
}
