import { IDirtyComponent } from './IDirtyComponent';
import { IGameObject } from '../../IGameObject';
export declare class DirtyComponent implements IDirtyComponent {
    parent: IGameObject;
    render: boolean;
    update: boolean;
    frame: number;
    constructor(parent: IGameObject);
    setRender(): void;
    setUpdate(): void;
    destroy(): void;
}
//# sourceMappingURL=DirtyComponent.d.ts.map