import { IBoundsComponent } from './IBoundsComponent';
import { IGameObject } from '../../IGameObject';
import { Rectangle } from '../../../geom/rectangle/Rectangle';
export declare class BoundsComponent implements IBoundsComponent {
    parent: IGameObject;
    area: Rectangle;
    fixed: boolean;
    constructor(parent: IGameObject);
    setArea(x: number, y: number, width: number, height: number): void;
    destroy(): void;
}
//# sourceMappingURL=BoundsComponent.d.ts.map