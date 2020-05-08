import { ISprite } from '../gameobjects/sprite/ISprite';
import { IStaticCamera } from '../camera/IStaticCamera';
export interface IWorldRenderData {
    camera: IStaticCamera;
    gameFrame: number;
    dirtyFrame: number;
    numRendered: number;
    numRenderable: number;
    renderList: ISprite[];
}
//# sourceMappingURL=IWorldRenderData.d.ts.map