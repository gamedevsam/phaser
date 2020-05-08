import { BaseWorld } from './BaseWorld';
import { CreateWorldRenderData } from './CreateWorldRenderData';
import { IGameObject } from '../gameobjects/IGameObject';
import { IScene } from '../scenes/IScene';
import { ISceneRenderData } from '../scenes/ISceneRenderData';
import { IStaticCamera } from '../camera/IStaticCamera';
import { IStaticWorld } from './IStaticWorld';
import { StaticCamera } from '../camera/StaticCamera';

//  A Static World is designed specifically to have a bounds of a fixed size
//  and a camera that doesn't move at all (no scrolling, rotation, etc)
//  Because it has a fixed size, there is no camera culling enabled.
//  Games that use this kind of world include Pacman, Bejeweled and 2048.

export class StaticWorld extends BaseWorld implements IStaticWorld
{
    camera: IStaticCamera;

    constructor (scene: IScene)
    {
        super(scene);

        this.type = 'StaticWorld';

        this.camera = new StaticCamera();

        this.renderData = CreateWorldRenderData(this.camera);
    }

    sceneRender (sceneRenderData: ISceneRenderData): void
    {
        super.sceneRender(sceneRenderData);

        this.camera.dirtyRender = false;
    }

    shutdown (): void
    {
        super.shutdown();

        this.camera.reset();
    }

    destroy (reparentChildren?: IGameObject): void
    {
        this.camera.destroy();

        super.destroy(reparentChildren);
    }
}
