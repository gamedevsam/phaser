import { IGameObject } from '../../IGameObject';
import { Rectangle } from '../../../geom/rectangle';
export interface IBoundsComponent {
    parent: IGameObject;
    area: Rectangle;
    fixed: boolean;
    setArea(x: number, y: number, width: number, height: number): void;
    destroy(): void;
}
//# sourceMappingURL=IBoundsComponent.d.ts.map