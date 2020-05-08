import { GameInstance } from '../GameInstance';
import { ICamera } from './ICamera';
import { IRenderer } from '../renderer/IRenderer';
import { IWorld } from '../world/IWorld';
import { Matrix2D } from '../math/matrix2d/Matrix2D';
import { Rectangle } from '../geom/rectangle/Rectangle';
import { Vec2Callback } from '../math/vec2/Vec2Callback';
import { WrapAngle } from '../math/angle';

export class Camera implements ICamera
{
    world: IWorld;
    matrix: Float32Array;
    renderer: IRenderer;
    type: string;

    width: number;
    height: number;
    bounds: Rectangle;

    dirtyRender: boolean;
    worldTransform: Matrix2D;

    position: Vec2Callback;
    scale: Vec2Callback;
    origin: Vec2Callback;

    private _rotation: number = 0;

    constructor ()
    {
        this.type = 'Camera';

        this.dirtyRender = true;

        const game = GameInstance.get();

        this.renderer = game.renderer;

        this.matrix = new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]);

        this.bounds = new Rectangle();

        this.worldTransform = new Matrix2D();

        this.position = new Vec2Callback(() => this.updateTransform(), 0, 0);
        this.scale = new Vec2Callback(() => this.updateTransform(), 1, 1);
        this.origin = new Vec2Callback(() => this.updateTransform(), 0.5, 0.5);

        this.reset();
    }

    updateTransform (): void
    {
        const matrix = this.matrix;

        const px = this.position.x;
        const py = this.position.y;

        const sx = this.scale.x;
        const sy = this.scale.y;

        const ox = -px + (this.width * this.origin.x);
        const oy = -py + (this.height * this.origin.y);

        const z = Math.sin(this.rotation);
        const w = Math.cos(this.rotation);

        const z2 = z + z;
        const zz = z * z2;
        const wz = w * z2;

        const out0 = (1 - zz) * sx;
        const out1 = wz * sx;
        const out4 = -wz * sy;
        const out5 = (1 - zz) * sy;

        matrix[0] = out0;
        matrix[1] = out1;
        matrix[4] = out4;
        matrix[5] = out5;
        matrix[12] = px + ox - (out0 * ox + out4 * oy);
        matrix[13] = py + oy - (out1 * ox + out5 * oy);

        this.worldTransform.set(
            w * sx,
            z * sx,
            -z * sy,
            w * sy,
            -px,
            -py
        );

        const bw = this.width * (1 / sx);
        const bh = this.height * (1 / sy);

        this.bounds.set(
            ox - (bw / 2),
            oy - (bh / 2),
            bw,
            bh
        );

        // console.log('b', this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);

        this.dirtyRender = true;
    }

    reset (): void
    {
        const width = this.renderer.width;
        const height = this.renderer.height;

        this.width = width;
        this.height = height;

        this.bounds.set(0, 0, width, height);
    }

    set rotation (value: number)
    {
        if (value !== this._rotation)
        {
            this._rotation = WrapAngle(value);

            this.updateTransform();
        }
    }

    get rotation (): number
    {
        return this._rotation;
    }

    destroy (): void
    {
        this.position.destroy();
        this.scale.destroy();
        this.origin.destroy();

        this.world = null;
        this.worldTransform = null;
        this.renderer = null;
        this.matrix = null;
        this.bounds = null;
    }
}
