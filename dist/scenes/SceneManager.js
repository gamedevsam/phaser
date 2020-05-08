import { Emit } from '../events/Emit.js';
import '../events/EventInstance.js';
import '../events/On.js';
import { Once } from '../events/Once.js';
import { GameInstance } from '../GameInstance.js';
import { GetScenes } from '../config/Scenes.js';
import { CreateSceneRenderData } from './CreateSceneRenderData.js';
import { ResetSceneRenderData } from './ResetSceneRenderData.js';
import { SceneManagerInstance } from './SceneManagerInstance.js';

class SceneManager {
    constructor() {
        this.scenes = new Map();
        this.sceneIndex = 0;
        this.flush = false;
        this.renderResult = CreateSceneRenderData();
        this.game = GameInstance.get();
        SceneManagerInstance.set(this);
        Once(this.game, 'boot', () => this.boot());
    }
    boot() {
        GetScenes().forEach(scene => new scene());
    }
    update(delta, time) {
        for (const scene of this.scenes.values()) {
            Emit(scene, 'update', delta, time);
        }
    }
    render(gameFrame) {
        const results = this.renderResult;
        ResetSceneRenderData(results, gameFrame);
        for (const scene of this.scenes.values()) {
            Emit(scene, 'render', results);
        }
        if (this.flush) {
            results.numDirtyFrames++;
            this.flush = false;
        }
        return results;
    }
}

export { SceneManager };
