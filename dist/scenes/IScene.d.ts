import { Game } from '..';
import { IEventInstance } from '../events/IEventInstance';
export interface IScene {
    key?: string;
    game: Game;
    events: Map<string, Set<IEventInstance>>;
}
//# sourceMappingURL=IScene.d.ts.map