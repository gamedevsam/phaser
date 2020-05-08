import '../events/EventInstance.js';
import { On } from '../events/On.js';
import { Once } from '../events/Once.js';
import '../GameInstance.js';
import '../math/matrix2d/Matrix2D.js';
import '../geom/rectangle/Contains.js';
import '../geom/rectangle/Rectangle.js';
import { StaticCamera } from '../camera/StaticCamera.js';
import '../gameobjects/GetChildIndex.js';
import '../gameobjects/RemoveChild.js';
import '../gameobjects/SetParent.js';
import '../math/matrix2d/Copy.js';
import '../gameobjects/components/transform/UpdateWorldTransform.js';
import '../gameobjects/RemoveChildrenBetween.js';
import '../gameobjects/DestroyChildren.js';
import '../gameobjects/components/bounds/BoundsComponent.js';
import '../gameobjects/components/dirty/DirtyComponent.js';
import '../gameobjects/components/input/InputComponent.js';
import '../gameobjects/components/transform/UpdateLocalTransform.js';
import '../gameobjects/components/transform/TransformComponent.js';
import '../gameobjects/ReparentChildren.js';
import { GameObject } from '../gameobjects/GameObject.js';
import { RemoveChildren } from '../gameobjects/RemoveChildren.js';
import { Clock } from '../time/Clock.js';
import { CreateWorldRenderData } from './CreateWorldRenderData.js';
import { MergeRenderData } from './MergeRenderData.js';
import { ResetWorldRenderData } from './ResetWorldRenderData.js';

class StaticWorld extends GameObject {
    constructor(scene) {
        super();
        this.camera = new StaticCamera();
        this.forceRefresh = false;
        this.world = this;
        this.scene = scene;
        this.clock = new Clock(this);
        this.renderData = CreateWorldRenderData(this.camera);
        On(scene, 'update', (delta, time) => this.update(delta, time));
        On(scene, 'render', (renderData) => this.render(renderData));
        On(scene, 'shutdown', () => this.shutdown());
        Once(scene, 'destroy', () => this.destroy());
    }
    scanChildren(root, renderData) {
        const children = root.children;
        for (let i = 0; i < children.length; i++) {
            this.buildRenderList(children[i], renderData);
        }
    }
    buildRenderList(root, renderData) {
        if (root.isRenderable()) {
            renderData.numRendered++;
            renderData.numRenderable++;
            renderData.renderList.push(root);
            if (root.dirty.frame >= renderData.gameFrame) {
                renderData.dirtyFrame++;
            }
        }
        if (root.visible && root.numChildren) {
            this.scanChildren(root, renderData);
        }
    }
    update(delta, time) {
        if (!this.willUpdate) {
            return;
        }
        this.clock.update(delta, time);
        super.update(delta, time);
    }
    render(sceneRenderData) {
        const renderData = this.renderData;
        ResetWorldRenderData(renderData, sceneRenderData.gameFrame);
        if (!this.willRender) {
            return;
        }
        this.scanChildren(this, renderData);
        if (this.forceRefresh) {
            renderData.dirtyFrame++;
            this.forceRefresh = false;
        }
        MergeRenderData(sceneRenderData, renderData);
        this.camera.dirtyRender = false;
    }
    shutdown() {
        RemoveChildren(this);
        this.renderData.renderList.length = 0;
        this.camera.reset();
    }
    destroy() {
        super.destroy();
        this.camera.destroy();
        this.renderData.renderList.length = 0;
        this.camera = null;
        this.renderData = null;
    }
}

export { StaticWorld };
