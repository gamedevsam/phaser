import './dom/GetElement.js';
import { AddToDOM } from './dom/AddToDOM.js';
import { DOMContentLoaded } from './dom/DOMContentLoaded.js';
import { Emit } from './events/Emit.js';
import { EventEmitter } from './events/EventEmitter.js';
import './events/EventInstance.js';
import './events/On.js';
import './events/Once.js';
import { GameInstance } from './GameInstance.js';
import { GetBanner } from './config/Banner.js';
import { GetRenderer } from './config/SetRenderer.js';
import { GetParent } from './config/Parent.js';
import './config/Scenes.js';
import './renderer/webgl1/GL.js';
import './scenes/CreateSceneRenderData.js';
import './scenes/ResetSceneRenderData.js';
import './scenes/SceneManagerInstance.js';
import { SceneManager } from './scenes/SceneManager.js';
import './textures/CreateCanvas.js';
import './math/pow2/IsSizePowerOfTwo.js';
import './renderer/webgl1/CreateGLTexture.js';
import './renderer/webgl1/DeleteFramebuffer.js';
import './renderer/webgl1/DeleteGLTexture.js';
import './textures/Frame.js';
import './renderer/webgl1/SetGLTextureFilterMode.js';
import './renderer/webgl1/UpdateGLTexture.js';
import './textures/Texture.js';
import './textures/TextureManagerInstance.js';
import { TextureManager } from './textures/TextureManager.js';

class Game extends EventEmitter {
    constructor(...settings) {
        super();
        this.VERSION = '4.0.0-beta1';
        this.isBooted = false;
        this.isPaused = false;
        this.willUpdate = true;
        this.willRender = true;
        this.lastTick = 0;
        this.frame = 0;
        GameInstance.set(this);
        DOMContentLoaded(() => this.boot(settings));
    }
    boot(settings) {
        settings.forEach(setting => setting());
        const renderer = GetRenderer();
        this.renderer = new renderer();
        this.textureManager = new TextureManager();
        this.sceneManager = new SceneManager();
        const parent = GetParent();
        if (parent) {
            AddToDOM(this.renderer.canvas, parent);
        }
        this.isBooted = true;
        GetBanner();
        Emit(this, 'boot');
        this.lastTick = performance.now();
        this.step(this.lastTick);
    }
    pause() {
        this.isPaused = true;
    }
    resume() {
        this.isPaused = false;
        this.lastTick = performance.now();
    }
    step(time) {
        const delta = time - this.lastTick;
        this.lastTick = time;
        if (!this.isPaused) {
            if (this.willUpdate) {
                this.sceneManager.update(delta, time);
            }
            if (this.willRender) {
                this.renderer.render(this.sceneManager.render(this.frame));
            }
        }
        this.frame++;
        GameInstance.setFrame(this.frame);
        requestAnimationFrame(now => this.step(now));
    }
    destroy() {
    }
}

export { Game };
