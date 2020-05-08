import { IGameObject } from '../../IGameObject';
import { IInputComponent } from './IInputComponent';
import { IInteractiveArea } from '../../../input/IInteractiveArea';
export declare class InputComponent implements IInputComponent {
    parent: IGameObject;
    enabled: boolean;
    enabledChildren: boolean;
    hitArea: IInteractiveArea;
    constructor(parent: IGameObject);
    destroy(): void;
}
//# sourceMappingURL=InputComponent.d.ts.map