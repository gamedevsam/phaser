import { Rectangle } from '../geom/rectangle/Rectangle';
import { WebGLRenderer } from '../renderer/webgl1/WebGLRenderer';
import { IScene } from '../scenes/IScene';

export class StaticCamera // implements ICamera
{
    scene: IScene;
    matrix: Float32Array;
    renderer: WebGLRenderer;
    dirtyRender: boolean = false;

    width: number;
    height: number;
    bounds: Rectangle;

    constructor (scene: IScene)
    {
        this.scene = scene;

        this.renderer = scene.game.renderer;

        this.matrix = new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]);

        this.bounds = new Rectangle();

        this.reset();
    }

    reset (): void
    {
        const width = this.renderer.width;
        const height = this.renderer.height;

        this.width = width;
        this.height = height;

        this.bounds.set(0, 0, width, height);
    }

    update (): void
    {
    }

    render (): void
    {
    }

    destroy (): void
    {
        this.scene = null;
        this.renderer = null;
        this.matrix = null;
        this.bounds = null;
    }
}
