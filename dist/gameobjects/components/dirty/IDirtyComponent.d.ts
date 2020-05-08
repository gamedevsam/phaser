import { IGameObject } from '../../IGameObject';
export interface IDirtyComponent {
    parent: IGameObject;
    render: boolean;
    update: boolean;
    frame: number;
    setRender(): void;
    setUpdate(): void;
    destroy(): void;
}
//# sourceMappingURL=IDirtyComponent.d.ts.map