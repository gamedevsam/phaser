import { Matrix2D } from '../../../math/matrix2d/Matrix2D.js';
import '../../../math/matrix2d/Copy.js';
import { UpdateWorldTransform } from './UpdateWorldTransform.js';
import { UpdateLocalTransform } from './UpdateLocalTransform.js';

class TransformComponent {
    constructor(parent, x = 0, y = 0) {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.skewX = 0;
        this.skewY = 0;
        this.originX = 0.5;
        this.originY = 0.5;
        this.width = 0;
        this.height = 0;
        this.parent = parent;
        this.local = new Matrix2D();
        this.world = new Matrix2D();
        this.x = x;
        this.y = y;
    }
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }
    setWidth(value) {
        this.width = value;
    }
    setHeight(value) {
        this.height = value;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        UpdateWorldTransform(this.parent);
    }
    setX(value) {
        this.x = value;
        UpdateWorldTransform(this.parent);
    }
    setY(value) {
        this.y = value;
        UpdateWorldTransform(this.parent);
    }
    setOrigin(x, y) {
        this.originX = x;
        this.originY = y;
    }
    setOriginX(value) {
        this.originX = value;
    }
    setOriginY(value) {
        this.originX = value;
    }
    setSkew(x, y) {
        this.skewX = x;
        this.skewY = y;
        UpdateLocalTransform(this.parent);
    }
    setSkewX(value) {
        if (value !== this.skewX) {
            this.skewX = value;
            UpdateLocalTransform(this.parent);
        }
    }
    setSkewY(value) {
        if (value !== this.skewY) {
            this.skewY = value;
            UpdateLocalTransform(this.parent);
        }
    }
    setScale(x, y) {
        this.scaleX = x;
        this.scaleY = y;
        UpdateLocalTransform(this.parent);
    }
    setScaleX(value) {
        if (value !== this.scaleX) {
            this.scaleX = value;
            UpdateLocalTransform(this.parent);
        }
    }
    setScaleY(value) {
        if (value !== this.scaleY) {
            this.scaleY = value;
            UpdateLocalTransform(this.parent);
        }
    }
    setRotation(value) {
        if (value !== this.rotation) {
            this.rotation = value;
            UpdateLocalTransform(this.parent);
        }
    }
    destroy() {
        this.parent = null;
        this.local = null;
        this.world = null;
    }
}

export { TransformComponent };
