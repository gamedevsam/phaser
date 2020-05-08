import { IGameObject } from '../../IGameObject';
import { IWorldRenderData } from '../../../world/IWorldRenderData';

export interface IDirtyComponent
{
    entity: IGameObject;
    render: boolean;
    pendingRender: boolean;
    postRender: boolean;
    update: boolean;
    colors: boolean;
    frame: number;
    setRender (): void;
    setPendingRender (renderData: IWorldRenderData): void;
    setPostRender (): void;
    setUpdate (): void;
    setColors (): void;
    destroy (): void;
}
