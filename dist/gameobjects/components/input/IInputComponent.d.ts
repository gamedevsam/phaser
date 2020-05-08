import { IGameObject } from '../../IGameObject';
import { IInteractiveArea } from '../../../input/IInteractiveArea';
export interface IInputComponent {
    parent: IGameObject;
    enabled: boolean;
    enabledChildren: boolean;
    hitArea?: IInteractiveArea;
    destroy(): void;
}
//# sourceMappingURL=IInputComponent.d.ts.map