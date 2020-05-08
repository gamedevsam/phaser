import { IBaseWorld } from '../world/IBaseWorld';
import { IBoundsComponent } from './components/bounds/IBoundsComponent';
import { IDirtyComponent } from './components/dirty/IDirtyComponent';
import { IInputComponent } from './components/input/IInputComponent';
import { IRenderer } from '../renderer/IRenderer';
import { ITransformComponent } from './components/transform/ITransformComponent';

export interface IGameObject
{
    world: IBaseWorld;
    name: string;
    type: string;

    willRender: boolean;
    willUpdate: boolean;
    willRenderChildren: boolean;
    willUpdateChildren: boolean;

    parent: IGameObject;
    children: IGameObject[];
    numChildren: number;

    visible: boolean;

    transform: ITransformComponent;
    dirty: IDirtyComponent;
    bounds: IBoundsComponent;
    input: IInputComponent;

    isRenderable (): boolean;
    update (delta: number, time: number): void;
    postUpdate (delta: number, time: number): void;
    render <T extends IRenderer> (renderer: T): void;
    postRender <T extends IRenderer> (renderer: T): void;
    destroy (reparentChildren?: IGameObject): void;
}
