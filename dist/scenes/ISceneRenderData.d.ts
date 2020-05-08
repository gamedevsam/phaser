import { IWorldRenderData } from '../world/IWorldRenderData';
export interface ISceneRenderData {
    gameFrame: number;
    numDirtyCameras: number;
    numDirtyFrames: number;
    numTotalFrames: number;
    worldData: IWorldRenderData[];
}
//# sourceMappingURL=ISceneRenderData.d.ts.map