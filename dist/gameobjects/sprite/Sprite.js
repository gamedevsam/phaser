import '../../GameInstance.js';
import '../../renderer/webgl1/GL.js';
import '../../math/pow2/IsSizePowerOfTwo.js';
import '../../renderer/webgl1/CreateGLTexture.js';
import '../../renderer/webgl1/DeleteFramebuffer.js';
import '../../renderer/webgl1/DeleteGLTexture.js';
import '../../textures/Frame.js';
import '../../renderer/webgl1/SetGLTextureFilterMode.js';
import '../../renderer/webgl1/UpdateGLTexture.js';
import '../../textures/Texture.js';
import '../../textures/TextureManagerInstance.js';
import '../../math/matrix2d/Matrix2D.js';
import '../../geom/rectangle/Contains.js';
import '../../geom/rectangle/Rectangle.js';
import '../GetChildIndex.js';
import '../RemoveChild.js';
import '../SetParent.js';
import '../../math/matrix2d/Copy.js';
import '../components/transform/UpdateWorldTransform.js';
import '../RemoveChildrenBetween.js';
import '../DestroyChildren.js';
import '../components/bounds/BoundsComponent.js';
import '../components/dirty/DirtyComponent.js';
import '../components/input/InputComponent.js';
import '../components/transform/UpdateLocalTransform.js';
import '../components/transform/TransformComponent.js';
import '../ReparentChildren.js';
import '../GameObject.js';
import { Container } from '../container/Container.js';
import { SetFrame } from './SetFrame.js';
import { SetTexture } from './SetTexture.js';

class Sprite extends Container {
    constructor(x, y, texture, frame) {
        super(x, y);
        this.hasTexture = false;
        this.prevTextureID = -1;
        this._tint = 0xffffff;
        this.vertexData = new Float32Array(24).fill(0);
        this.vertexColor = new Uint32Array(4).fill(4294967295);
        this.vertexAlpha = new Float32Array(4).fill(1);
        this.vertexTint = new Uint32Array(4).fill(0xffffff);
        this.type = 'Sprite';
        this.setTexture(texture, frame);
        this.bounds.setArea(x, y, this.width, this.height);
    }
    setTexture(key, frame) {
        SetTexture(key, frame, this);
        return this;
    }
    setFrame(key) {
        SetFrame(this.texture, key, this);
        return this;
    }
    isRenderable() {
        return (this.visible && this.willRender && this.hasTexture && this.alpha > 0);
    }
    updateVertices() {
        const data = this.vertexData;
        this.dirty.render = false;
        const frame = this.frame;
        const originX = this.originX;
        const originY = this.originY;
        let w0;
        let w1;
        let h0;
        let h1;
        const { a, b, c, d, tx, ty } = this.transform.world;
        if (frame.trimmed) {
            w1 = frame.spriteSourceSizeX - (originX * frame.sourceSizeWidth);
            w0 = w1 + frame.spriteSourceSizeWidth;
            h1 = frame.spriteSourceSizeY - (originY * frame.sourceSizeHeight);
            h0 = h1 + frame.spriteSourceSizeHeight;
        }
        else {
            w1 = -originX * frame.sourceSizeWidth;
            w0 = w1 + frame.sourceSizeWidth;
            h1 = -originY * frame.sourceSizeHeight;
            h0 = h1 + frame.sourceSizeHeight;
        }
        const x0 = (w1 * a) + (h1 * c) + tx;
        const y0 = (w1 * b) + (h1 * d) + ty;
        const x1 = (w1 * a) + (h0 * c) + tx;
        const y1 = (w1 * b) + (h0 * d) + ty;
        const x2 = (w0 * a) + (h0 * c) + tx;
        const y2 = (w0 * b) + (h0 * d) + ty;
        const x3 = (w0 * a) + (h1 * c) + tx;
        const y3 = (w0 * b) + (h1 * d) + ty;
        data[0] = x0;
        data[1] = y0;
        data[6] = x1;
        data[7] = y1;
        data[12] = x2;
        data[13] = y2;
        data[18] = x3;
        data[19] = y3;
        const boundsX = Math.min(x0, x1, x2, x3);
        const boundsY = Math.min(y0, y1, y2, y3);
        const boundsRight = Math.max(x0, x1, x2, x3);
        const boundsBottom = Math.max(y0, y1, y2, y3);
        this.bounds.setArea(boundsX, boundsY, boundsRight, boundsBottom);
    }
    get tint() {
        return this._tint;
    }
    set tint(value) {
        this._tint = value;
    }
    destroy(reparentChildren) {
        super.destroy(reparentChildren);
        this.texture = null;
        this.frame = null;
        this.hasTexture = false;
        this.vertexData = null;
        this.vertexColor = null;
        this.vertexAlpha = null;
        this.vertexTint = null;
    }
}

export { Sprite };
