import { IRenderer } from '../renderer/IRenderer';
import { IStaticCamera } from './IStaticCamera';
import { IWorld } from '../world/IWorld';
import { Matrix2D } from '../math/matrix2d/Matrix2D';
import { Rectangle } from '../geom/rectangle/Rectangle';
export declare class StaticCamera implements IStaticCamera {
    world: IWorld;
    matrix: Float32Array;
    renderer: IRenderer;
    type: string;
    width: number;
    height: number;
    bounds: Rectangle;
    dirtyRender: boolean;
    worldTransform: Matrix2D;
    constructor();
    reset(): void;
    destroy(): void;
}
//# sourceMappingURL=StaticCamera.d.ts.map