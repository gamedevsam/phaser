import '../GameInstance.js';
import '../math/matrix2d/Matrix2D.js';
import '../geom/rectangle/Contains.js';
import '../geom/rectangle/Rectangle.js';
import './GetChildIndex.js';
import './RemoveChild.js';
import './SetParent.js';
import '../math/matrix2d/Copy.js';
import './components/transform/UpdateWorldTransform.js';
import './RemoveChildrenBetween.js';
import { DestroyChildren } from './DestroyChildren.js';
import { BoundsComponent } from './components/bounds/BoundsComponent.js';
import { DirtyComponent } from './components/dirty/DirtyComponent.js';
import { InputComponent } from './components/input/InputComponent.js';
import './components/transform/UpdateLocalTransform.js';
import { TransformComponent } from './components/transform/TransformComponent.js';
import { ReparentChildren } from './ReparentChildren.js';

class GameObject {
    constructor(x = 0, y = 0) {
        this.name = '';
        this.type = 'GameObject';
        this.willRender = true;
        this.willUpdate = true;
        this.visible = true;
        this.children = [];
        this.dirty = new DirtyComponent(this);
        this.transform = new TransformComponent(this, x, y);
        this.bounds = new BoundsComponent(this);
        this.input = new InputComponent(this);
    }
    isRenderable() {
        return (this.visible && this.willRender);
    }
    update(delta, time) {
        if (this.willUpdate) {
            const children = this.children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (child && child.willUpdate) {
                    child.update(delta, time);
                }
            }
        }
    }
    get numChildren() {
        return this.children.length;
    }
    set width(value) {
        this.transform.setWidth(value);
    }
    get width() {
        return this.transform.width;
    }
    set height(value) {
        this.transform.setHeight(value);
    }
    get height() {
        return this.transform.height;
    }
    set x(value) {
        this.transform.setX(value);
    }
    get x() {
        return this.transform.x;
    }
    set y(value) {
        this.transform.setY(value);
    }
    get y() {
        return this.transform.y;
    }
    set originX(value) {
        this.transform.setOriginX(value);
    }
    get originX() {
        return this.transform.originX;
    }
    set originY(value) {
        this.transform.setOriginY(value);
    }
    get originY() {
        return this.transform.originY;
    }
    set skewX(value) {
        this.transform.setSkewX(value);
    }
    get skewX() {
        return this.transform.skewX;
    }
    set skewY(value) {
        this.transform.setSkewY(value);
    }
    get skewY() {
        return this.transform.skewY;
    }
    set scaleX(value) {
        this.transform.setScaleX(value);
    }
    get scaleX() {
        return this.transform.scaleX;
    }
    set scaleY(value) {
        this.transform.setScaleY(value);
    }
    get scaleY() {
        return this.transform.scaleY;
    }
    set rotation(value) {
        this.transform.setRotation(value);
    }
    get rotation() {
        return this.transform.rotation;
    }
    destroy(reparentChildren) {
        if (reparentChildren) {
            ReparentChildren(this, reparentChildren);
        }
        else {
            DestroyChildren(this);
        }
        this.transform.destroy();
        this.dirty.destroy();
        this.bounds.destroy();
        this.input.destroy();
        this.world = null;
        this.parent = null;
        this.children = null;
    }
}

export { GameObject };
