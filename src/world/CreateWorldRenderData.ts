import { IBaseCamera } from '../camera/IBaseCamera';
import { IWorldRenderData } from './IWorldRenderData';

export function CreateWorldRenderData (camera: IBaseCamera): IWorldRenderData
{
    return {
        camera,
        gameFrame: 0,
        dirtyFrame: 0,
        numRendered: 0,
        numRenderable: 0,
        renderList: []
    };
}
