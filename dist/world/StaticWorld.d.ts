import { Clock } from '../time/Clock';
import { GameObject } from '../gameobjects/GameObject';
import { IScene } from '../scenes/IScene';
import { ISceneRenderData } from '../scenes/ISceneRenderData';
import { IStaticCamera } from '../camera/IStaticCamera';
import { IWorld } from './IWorld';
import { IWorldRenderData } from './IWorldRenderData';
export declare class StaticWorld extends GameObject implements IWorld {
    scene: IScene;
    clock: Clock;
    camera: IStaticCamera;
    renderData: IWorldRenderData;
    forceRefresh: boolean;
    constructor(scene: IScene);
    private scanChildren;
    private buildRenderList;
    update(delta: number, time: number): void;
    render(sceneRenderData: ISceneRenderData): void;
    shutdown(): void;
    destroy(): void;
}
//# sourceMappingURL=StaticWorld.d.ts.map