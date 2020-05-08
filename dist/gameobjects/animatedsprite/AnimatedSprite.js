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
import '../container/Container.js';
import '../sprite/SetFrame.js';
import '../sprite/SetTexture.js';
import { Sprite } from '../sprite/Sprite.js';

class AnimatedSprite extends Sprite {
    constructor(x, y, texture, frame) {
        super(x, y, texture, frame);
        this.type = 'AnimatedSprite';
        this.anims = new Map();
        this.animData = {
            currentAnim: '',
            currentFrames: [],
            frameIndex: 0,
            animSpeed: 0,
            nextFrameTime: 0,
            repeatCount: 0,
            isPlaying: false,
            yoyo: false,
            pendingStart: false,
            playingForward: true,
            delay: 0,
            repeatDelay: 0,
            onStart: null,
            onRepeat: null,
            onComplete: null
        };
    }
    stop() {
        const data = this.animData;
        data.isPlaying = false;
        data.currentAnim = '';
        if (data.onComplete) {
            data.onComplete(this, data.currentAnim);
        }
    }
    nextFrame() {
        const data = this.animData;
        data.frameIndex++;
        if (data.frameIndex === data.currentFrames.length) {
            if (data.yoyo) {
                data.frameIndex--;
                data.playingForward = false;
            }
            else if (data.repeatCount === -1 || data.repeatCount > 0) {
                data.frameIndex = 0;
                if (data.repeatCount !== -1) {
                    data.repeatCount--;
                }
                if (data.onRepeat) {
                    data.onRepeat(this, data.currentAnim);
                }
                data.nextFrameTime += data.repeatDelay;
            }
            else {
                data.frameIndex--;
                return this.stop();
            }
        }
        this.setFrame(data.currentFrames[data.frameIndex]);
        data.nextFrameTime += data.animSpeed;
    }
    prevFrame() {
        const data = this.animData;
        data.frameIndex--;
        if (data.frameIndex === -1) {
            if (data.repeatCount === -1 || data.repeatCount > 0) {
                data.frameIndex = 0;
                data.playingForward = true;
                if (data.repeatCount !== -1) {
                    data.repeatCount--;
                }
                if (data.onRepeat) {
                    data.onRepeat(this, data.currentAnim);
                }
                data.nextFrameTime += data.repeatDelay;
            }
            else {
                data.frameIndex = 0;
                return this.stop();
            }
        }
        this.setFrame(data.currentFrames[data.frameIndex]);
        data.nextFrameTime += data.animSpeed;
    }
    update(delta, now) {
        super.update(delta, now);
        const data = this.animData;
        if (!data.isPlaying) {
            return;
        }
        data.nextFrameTime -= delta * 1000;
        data.nextFrameTime = Math.max(data.nextFrameTime, 0);
        if (data.nextFrameTime === 0) {
            if (data.pendingStart) {
                if (data.onStart) {
                    data.onStart(this, data.currentAnim);
                }
                data.pendingStart = false;
                data.nextFrameTime = data.animSpeed;
            }
            else if (data.playingForward) {
                this.nextFrame();
            }
            else {
                this.prevFrame();
            }
        }
    }
    get isPlaying() {
        return this.animData.isPlaying;
    }
    get isPlayingForward() {
        return (this.animData.isPlaying && this.animData.playingForward);
    }
    get currentAnimation() {
        return this.animData.currentAnim;
    }
    destroy(reparentChildren) {
        super.destroy(reparentChildren);
        this.anims.clear();
        this.animData = null;
    }
}

export { AnimatedSprite };
