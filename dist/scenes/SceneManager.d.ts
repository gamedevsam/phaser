import { Game } from '../Game';
import { IScene } from './IScene';
import { ISceneRenderData } from './ISceneRenderData';
export declare class SceneManager {
    game: Game;
    scenes: Map<string, IScene>;
    sceneIndex: number;
    flush: boolean;
    renderResult: ISceneRenderData;
    constructor();
    boot(): void;
    update(delta: number, time: number): void;
    render(gameFrame: number): ISceneRenderData;
}
//# sourceMappingURL=SceneManager.d.ts.map