import { BoundsComponent, DirtyComponent, InputComponent, TransformComponent } from './components';

import { DestroyChildren } from '../display/DestroyChildren';
import { IBaseWorld } from '../world/IBaseWorld';
import { IBoundsComponent } from './components/bounds/IBoundsComponent';
import { IDirtyComponent } from './components/dirty/IDirtyComponent';
import { IGameObject } from './IGameObject';
import { IInputComponent } from './components/input/IInputComponent';
import { IRenderer } from '../renderer/IRenderer';
import { ITransformComponent } from './components/transform/ITransformComponent';
import { ReparentChildren } from '../display/ReparentChildren';

export class GameObject
{
    world: IBaseWorld;
    type: string = 'GameObject';
    name: string = '';

    parent: IGameObject;
    children: IGameObject[];

    willUpdate: boolean = true;
    willUpdateChildren: boolean = true;

    willRender: boolean = true;
    willRenderChildren: boolean = true;

    transform: ITransformComponent;
    dirty: IDirtyComponent;
    bounds: IBoundsComponent;
    input: IInputComponent;

    visible: boolean = true;

    constructor (x: number = 0, y: number = 0)
    {
        this.children = [];

        this.dirty = new DirtyComponent(this);
        this.transform = new TransformComponent(this, x, y);
        this.bounds = new BoundsComponent(this);
        this.input = new InputComponent(this);

        this.transform.update();
    }

    isRenderable (): boolean
    {
        return (this.visible && this.willRender);
    }

    update (delta: number, time: number): void
    {
        if (this.willUpdateChildren)
        {
            const children = this.children;

            for (let i = 0; i < children.length; i++)
            {
                const child = children[i];

                if (child && child.willUpdate)
                {
                    child.update(delta, time);
                }
            }
        }

        this.postUpdate(delta, time);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postUpdate (delta: number, time: number): void
    {
        //  Empty for parent classes to use.
        //  Called after this GameObject and all of its children have been updated.
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render <T extends IRenderer> (renderer: T): void
    {
        //  Empty for parent classes to use
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postRender <T extends IRenderer> (renderer: T): void
    {
        //  Empty for parent classes to use.
        //  Called after this GameObject and all of its children have been rendered.
        //  If it doesn't have any children, this method is never called.
    }

    get numChildren (): number
    {
        return this.children.length;
    }

    destroy (reparentChildren?: IGameObject): void
    {
        if (reparentChildren)
        {
            ReparentChildren(this, reparentChildren);
        }
        else
        {
            DestroyChildren(this);
        }

        this.transform.destroy();
        this.dirty.destroy();
        this.bounds.destroy();
        this.input.destroy();

        this.world = null;
        this.parent = null;
        this.children = null;
    }
}
