import { IMatrix2D } from '../math/matrix2d/IMatrix2D';
import { IRectangle } from '../geom/rectangle/IRectangle';
import { IRenderer } from '../renderer/IRenderer';
import { IWorld } from '../world/IWorld';
export interface IStaticCamera {
    world: IWorld;
    matrix: Float32Array;
    renderer: IRenderer;
    type: string;
    width: number;
    height: number;
    bounds: IRectangle;
    dirtyRender: boolean;
    worldTransform: IMatrix2D;
    reset(): void;
    destroy(): void;
}
//# sourceMappingURL=IStaticCamera.d.ts.map