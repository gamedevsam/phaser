import { IWorldRenderData } from '../world/IWorldRenderData';

export interface ISceneRenderData
{
    //  The current Game Frame number
    gameFrame: number;

    //  How many Cameras were made dirty this frame across all Scenes?
    numDirtyCameras: number;

    //  How many Game Objects were made dirty this frame across all Scenes?
    numDirtyFrames: number;

    //  How many Game Objects were processed this frame across all Scenes?
    numTotalFrames: number;

    //  An array of all the Worlds due to be rendered - safe to clear this every frame as it's such a tiny array
    worldData: IWorldRenderData[];
}
