import { Clock } from '../time/Clock';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IGameObject } from '../gameobjects/IGameObject';
import { IScene } from '../scenes/IScene';
import { ISceneRenderData } from '../scenes/ISceneRenderData';
import { IWorldRenderData } from './IWorldRenderData';

export interface IBaseWorld extends IGameObject
{
    scene: IScene;
    clock: Clock;
    camera: IBaseCamera;
    renderData: IWorldRenderData;
    forceRefresh: boolean;
    scanChildren (root: IGameObject, renderData: IWorldRenderData): void;
    buildRenderList (root: IGameObject, renderData: IWorldRenderData): void;
    sceneRender (sceneRenderData: ISceneRenderData): void;
    shutdown (): void;
}
