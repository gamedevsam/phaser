import IInteractiveArea from '../../input/IInteractiveArea';
import Rectangle from '../../geom/Rectangle';
import IParent from '../container/IParent';
import IBaseScene from '../../scenes/IBaseScene';

//  The Base Game Object which all Scene entites extend

export default class GameObject
{
    scene: IBaseScene;
    name: string = '';
    type: string = 'GameObject';

    willRender: boolean = true;
    willUpdate: boolean = true;

    dirtyRender: boolean = true;
    dirtyUpdate: boolean = true;
    dirtyFrame: number = 0;

    parent: IParent;
    isParent: boolean = false;

    visible: boolean = true;

    inputEnabled: boolean = false;
    inputEnabledChildren: boolean = true;
    inputHitArea: IInteractiveArea;

    fixBounds: boolean = false;
    bounds: Rectangle = new Rectangle();

    constructor ()
    {
    }

    isRenderable (): boolean
    {
        return (this.visible && this.willRender);
    }

    setDirtyRender (setFrame: boolean = true)
    {
        this.dirtyRender = true;

        const scene = this.scene;

        if (setFrame && scene)
        {
            this.dirtyFrame = scene.game.frame;
        }

        return this;
    }

    setDirtyUpdate ()
    {
        this.dirtyUpdate = true;

        return this;
    }

    getBounds (includeChildren: boolean = false): Rectangle
    {
        return this.bounds;
    }

    update ()
    {
    }

    updateTransform ()
    {
        return this;
    }

    render ()
    {
    }

    destroy (reparentChildren?: IParent)
    {
        this.scene = null;
    }
}