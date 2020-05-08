import { GameInstance } from '../../../GameInstance';
import { IDirtyComponent } from './IDirtyComponent';
import { IGameObject } from '../../IGameObject';
import { IWorldRenderData } from '../../../world/IWorldRenderData';

export class DirtyComponent implements IDirtyComponent
{
    entity: IGameObject;
    render: boolean = true;
    pendingRender: boolean = false;
    postRender: boolean = false;
    update: boolean = true;
    colors: boolean = true;
    frame: number = 0;

    constructor (entity: IGameObject)
    {
        this.entity = entity;
    }

    setPendingRender (renderData: IWorldRenderData): void
    {
        if (this.pendingRender)
        {
            return;
        }

        this.pendingRender = true;

        renderData.numRendered++;
        renderData.numRenderable++;

        if (this.frame >= renderData.gameFrame)
        {
            renderData.dirtyFrame++;
        }
    }

    setPostRender (): void
    {
        this.postRender = true;
    }

    setRender (): void
    {
        this.render = true;
        this.frame = GameInstance.getFrame();
    }

    setUpdate (): void
    {
        this.update = true;
    }

    setColors (): void
    {
        this.colors = true;
        this.frame = GameInstance.getFrame();
    }

    destroy (): void
    {
        this.entity = null;
    }
}
