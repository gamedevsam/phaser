import { IGameObject } from '../../IGameObject';
import { ITransformComponent } from './ITransformComponent';
import { Matrix2D } from '../../../math/matrix2d/Matrix2D';
export declare class TransformComponent implements ITransformComponent {
    parent: IGameObject;
    local: Matrix2D;
    world: Matrix2D;
    x: number;
    y: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    skewX: number;
    skewY: number;
    originX: number;
    originY: number;
    width: number;
    height: number;
    constructor(parent: IGameObject, x?: number, y?: number);
    setSize(width: number, height: number): void;
    setWidth(value: number): void;
    setHeight(value: number): void;
    setPosition(x: number, y: number): void;
    setX(value: number): void;
    setY(value: number): void;
    setOrigin(x: number, y: number): void;
    setOriginX(value: number): void;
    setOriginY(value: number): void;
    setSkew(x: number, y: number): void;
    setSkewX(value: number): void;
    setSkewY(value: number): void;
    setScale(x: number, y: number): void;
    setScaleX(value: number): void;
    setScaleY(value: number): void;
    setRotation(value: number): void;
    destroy(): void;
}
//# sourceMappingURL=TransformComponent.d.ts.map