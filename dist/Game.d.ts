import { EventEmitter } from './events';
import { IRenderer } from './renderer/IRenderer';
import { SceneManager } from './scenes/SceneManager';
import { TextureManager } from './textures/TextureManager';
export declare class Game extends EventEmitter {
    readonly VERSION: string;
    isBooted: boolean;
    isPaused: boolean;
    willUpdate: boolean;
    willRender: boolean;
    lastTick: number;
    frame: number;
    renderer: IRenderer;
    textureManager: TextureManager;
    sceneManager: SceneManager;
    constructor(...settings: {
        (): void;
    }[]);
    boot(settings: {
        (): void;
    }[]): void;
    pause(): void;
    resume(): void;
    step(time: number): void;
    destroy(): void;
}
//# sourceMappingURL=Game.d.ts.map