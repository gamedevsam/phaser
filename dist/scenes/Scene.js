import { GameInstance } from '../GameInstance.js';
import './SceneManagerInstance.js';
import './GetConfigValue.js';
import { Install } from './Install.js';

class Scene {
    constructor(config) {
        this.game = GameInstance.get();
        this.events = new Map();
        Install(this, config);
    }
}

export { Scene };
