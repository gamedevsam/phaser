import { GameInstance } from '../GameInstance';
import { IRenderer } from '../renderer/IRenderer';
import { IStaticCamera } from './IStaticCamera';
import { IStaticWorld } from '../world/IStaticWorld';
import { Matrix2D } from '../math/matrix2d/Matrix2D';
import { Rectangle } from '../geom/rectangle/Rectangle';

export class StaticCamera implements IStaticCamera
{
    world: IStaticWorld;
    matrix: Float32Array;
    renderer: IRenderer;
    type: string;

    width: number;
    height: number;
    bounds: Rectangle;

    dirtyRender: boolean;
    worldTransform: Matrix2D;

    constructor ()
    {
        this.type = 'StaticCamera';

        this.dirtyRender = true;

        const game = GameInstance.get();

        this.renderer = game.renderer;

        this.matrix = new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]);

        this.bounds = new Rectangle();

        this.worldTransform = new Matrix2D();

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

    destroy (): void
    {
        this.world = null;
        this.worldTransform = null;
        this.renderer = null;
        this.matrix = null;
        this.bounds = null;
    }
}
