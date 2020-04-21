import { ICamera } from '../camera/ICamera';
import { StaticCamera } from '../camera/StaticCamera';
import { IContainer } from '../gameobjects/container/IContainer';
import { IGameObject } from '../gameobjects/gameobject/IGameObject';
import { ISprite } from '../gameobjects/sprite/ISprite';
import { Matrix2D } from '../math/matrix2d/Matrix2D';
import { StaticScene } from '../scenes/StaticScene';
import { IWorld } from './IWorld';

//  A Static World is designed specifically to have a bounds of a fixed size
//  and a camera that doesn't move at all (no scrolling, rotation, etc)
//  Because it has a fixed size, there is no camera culling enabled.
//  Games that use this kind of world include Pacman, Bejeweled and 2048.

export class StaticWorld implements IWorld
{
    scene: StaticScene;

    camera: ICamera;

    children: IGameObject[] = [];

    //  How many Game Objects were made dirty this frame?
    dirtyFrame: number = 0;

    //  How many Game Objects will be rendered this frame? (are in-bounds)
    numRendered: number = 0;

    //  How many Game Objects passed `willRender` this frame? (but may not have been in bounds)
    numRenderable: number = 0;

    //  A list of Game Objects that will be rendered in the next pass
    rendered: ISprite[] = [];

    forceRefresh: boolean = false;

    worldTransform: Matrix2D = new Matrix2D();

    constructor (scene: StaticScene)
    {
        this.scene = scene;
        // TODO: Remove as unknown when camera system has proper types
        this.camera = new StaticCamera(scene) as unknown as ICamera;
    }

    private scanChildren (root: IContainer | StaticWorld, gameFrame: number)
    {
        const children = root.children;

        for (let i = 0; i < children.length; i++)
        {
            this.buildRenderList(children[i], gameFrame);
        }
    }

    private buildRenderList (root: IGameObject, gameFrame: number)
    {
        if (root.isRenderable())
        {
            this.numRendered++;
            this.rendered.push(root as ISprite);

            if (root.dirtyFrame >= gameFrame)
            {
                this.dirtyFrame++;
            }

            this.numRenderable++;
        }

        if (root.isParent && root.visible)
        {
            this.scanChildren(root as IContainer, gameFrame);
        }
    }

    update (delta?: number, time?: number)
    {
        const children = this.children;

        for (let i = 0; i < children.length; i++)
        {
            let child = children[i];

            if (child && child.willUpdate)
            {
                child.update(delta, time);
            }
        }
    }

    render (gameFrame: number): number
    {
        this.dirtyFrame = 0;
        this.numRendered = 0;
        this.numRenderable = 0;

        this.scanChildren(this, gameFrame);

        if (this.forceRefresh)
        {
            this.dirtyFrame++;
            this.forceRefresh = false;
        }

        return this.dirtyFrame;
    }

    shutdown ()
    {
        //  Clear the display list and reset the camera, but leave
        //  everything in place so we can return to this World again
        //  at a later stage

        // this.removeChildren();

        this.rendered = [];

        this.camera.reset();
    }

    destroy ()
    {
        this.camera.destroy();

        this.camera = null;
        this.rendered = null;
    }

    get numChildren (): number
    {
        return this.children.length;
    }
}
