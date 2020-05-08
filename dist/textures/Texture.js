import '../renderer/webgl1/GL.js';
import '../math/pow2/IsSizePowerOfTwo.js';
import { CreateGLTexture } from '../renderer/webgl1/CreateGLTexture.js';
import { DeleteFramebuffer } from '../renderer/webgl1/DeleteFramebuffer.js';
import { DeleteGLTexture } from '../renderer/webgl1/DeleteGLTexture.js';
import { Frame } from './Frame.js';
import { SetGLTextureFilterMode } from '../renderer/webgl1/SetGLTextureFilterMode.js';
import { UpdateGLTexture } from '../renderer/webgl1/UpdateGLTexture.js';

class Texture {
    constructor(image, width, height) {
        this.key = '';
        this.glIndex = 0;
        this.glIndexCounter = -1;
        if (image) {
            width = image.width;
            height = image.height;
        }
        this.image = image;
        this.width = width;
        this.height = height;
        this.frames = new Map();
        this.data = {};
        this.add('__BASE', 0, 0, width, height);
    }
    add(key, x, y, width, height) {
        if (this.frames.has(key)) {
            return null;
        }
        const frame = new Frame(this, key, x, y, width, height);
        this.frames.set(key, frame);
        if (!this.firstFrame || this.firstFrame.key === '__BASE') {
            this.firstFrame = frame;
        }
        return frame;
    }
    get(key) {
        if (!key) {
            return this.firstFrame;
        }
        if (key instanceof Frame) {
            key = key.key;
        }
        let frame = this.frames.get(key);
        if (!frame) {
            console.warn('Texture.frame missing: ' + key);
            frame = this.firstFrame;
        }
        return frame;
    }
    getFrames(frames) {
        const output = [];
        frames.forEach((key) => {
            output.push(this.get(key));
        });
        return output;
    }
    getFramesInRange(prefix, start, end, zeroPad = 0, suffix = '') {
        const frameKeys = [];
        const diff = (start < end) ? 1 : -1;
        end += diff;
        for (let i = start; i !== end; i += diff) {
            frameKeys.push(prefix + i.toString().padStart(zeroPad, '0') + suffix);
        }
        return this.getFrames(frameKeys);
    }
    setSize(width, height) {
        this.width = width;
        this.height = height;
        const frame = this.frames.get('__BASE');
        frame.setSize(width, height);
    }
    setFilter(linear) {
        SetGLTextureFilterMode(this.glTexture, linear);
    }
    createGL() {
        if (this.glTexture) {
            DeleteGLTexture(this.glTexture);
        }
        this.glTexture = CreateGLTexture(this.image);
    }
    updateGL() {
        if (!this.glTexture) {
            this.glTexture = CreateGLTexture(this.image);
        }
        else {
            UpdateGLTexture(this.image, this.glTexture);
        }
    }
    destroy() {
        this.frames.clear();
        this.image = null;
        this.firstFrame = null;
        this.data = null;
        DeleteGLTexture(this.glTexture);
        DeleteFramebuffer(this.glFramebuffer);
    }
}

export { Texture };
