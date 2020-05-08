import { GameInstance } from '../../GameInstance.js';
import '../../renderer/webgl1/GL.js';
import '../../textures/CreateCanvas.js';
import '../../math/pow2/IsSizePowerOfTwo.js';
import { CreateGLTexture } from '../../renderer/webgl1/CreateGLTexture.js';
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
import { CanvasTexture } from '../../textures/types/CanvasTexture.js';

class Text extends Sprite {
    constructor(x, y, text = '', font, fillStyle) {
        super(x, y, CanvasTexture());
        this.splitRegExp = /(?:\r\n|\r|\n)/;
        this.padding = { left: 0, right: 0, top: 0, bottom: 0 };
        this.verticalAlign = 'ascent';
        this.lineSpacing = 0;
        this.font = '16px monospace';
        this.fillStyle = '#fff';
        this.strokeStyle = '';
        this.backgroundStyle = '';
        this.cornerRadius = 0;
        this.textAlign = 'left';
        this.textBaseline = 'alphabetic';
        this.lineWidth = 0;
        this.lineDash = [];
        this.antialias = false;
        this.type = 'Text';
        const game = GameInstance.get();
        this.resolution = game.renderer.resolution;
        this.canvas = this.texture.image;
        this.context = this.canvas.getContext('2d');
        this.texture.glTexture = CreateGLTexture(this.canvas, 32, 32, false, this.antialias);
        if (font) {
            this.font = font;
        }
        if (fillStyle) {
            this.fillStyle = fillStyle;
        }
        this.setText(text);
    }
    syncContext(canvas, ctx) {
        if (this.preRenderCallback) {
            this.preRenderCallback(canvas, ctx);
        }
        ctx.font = this.font;
        ctx.textBaseline = this.textBaseline;
        ctx.textAlign = this.textAlign;
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.setLineDash(this.lineDash);
        ctx.imageSmoothingEnabled = this.antialias;
    }
    updateText() {
        const canvas = this.canvas;
        const ctx = this.context;
        const resolution = this.resolution;
        const lines = this._text.split(this.splitRegExp);
        const padding = this.padding;
        const fillStyle = this.fillStyle;
        const strokeStyle = this.strokeStyle;
        const strokeWidth = this.lineWidth;
        const lineSpacing = this.lineSpacing;
        const strokeWidthHalf = (strokeWidth > 0) ? strokeWidth / 2 : 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.syncContext(canvas, ctx);
        ctx.textAlign = 'start';
        let maxWidth = 0;
        let maxHeight = 0;
        let y = 0;
        const lineMetrics = [];
        const vAlignAscent = (this.verticalAlign === 'ascent');
        const metrics = ctx.measureText('|MÉq');
        const averageLineHeight = Math.ceil(Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent)) + strokeWidth;
        for (let i = 0; i < lines.length; i++) {
            const metrics = ctx.measureText(lines[i]);
            const left = metrics.actualBoundingBoxLeft;
            const right = metrics.actualBoundingBoxRight;
            let ascent = metrics.actualBoundingBoxAscent;
            let descent = metrics.actualBoundingBoxDescent;
            if ((!ascent && !descent) || lines[i] === '') {
                ascent = averageLineHeight;
                descent = 0;
            }
            const lineWidth = Math.ceil(Math.abs(left) + Math.abs(right)) + strokeWidth;
            const lineHeight = Math.ceil(Math.abs(ascent) + Math.abs(descent)) + strokeWidth;
            if (vAlignAscent) {
                y += ascent + strokeWidthHalf;
                if (i > 0) {
                    y += lineSpacing + strokeWidthHalf;
                }
                maxHeight = y + descent + strokeWidthHalf;
            }
            else {
                y = maxHeight + ((lineHeight - descent) - strokeWidthHalf);
                maxHeight += lineHeight;
                if (i < lines.length - 1) {
                    maxHeight += lineSpacing;
                }
            }
            maxWidth = Math.max(maxWidth, lineWidth);
            lineMetrics.push({ lineWidth, lineHeight, ascent, descent, left, right, y });
        }
        maxWidth += padding.left + padding.right;
        maxHeight += padding.top + padding.bottom;
        const displayWidth = (this.fixedWidth) ? this.fixedWidth : maxWidth;
        const displayHeight = (this.fixedHeight) ? this.fixedHeight : maxHeight;
        const canvasWidth = Math.ceil(displayWidth * resolution);
        const canvasHeight = Math.ceil(displayHeight * resolution);
        if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            this.texture.setSize(displayWidth, displayHeight);
            this.transform.setSize(displayWidth, displayHeight);
        }
        ctx.save();
        ctx.scale(resolution, resolution);
        this.syncContext(canvas, ctx);
        const backgroundStyle = this.backgroundStyle;
        if (backgroundStyle) {
            ctx.save();
            ctx.fillStyle = backgroundStyle;
            ctx.strokeStyle = backgroundStyle;
            const cornerRadius = this.cornerRadius;
            const halfRadius = (cornerRadius > 0) ? cornerRadius / 2 : 0;
            if (cornerRadius) {
                ctx.lineWidth = cornerRadius;
                ctx.strokeRect(halfRadius, halfRadius, displayWidth - cornerRadius, displayHeight - cornerRadius);
            }
            ctx.fillRect(halfRadius, halfRadius, displayWidth - cornerRadius, displayHeight - cornerRadius);
            ctx.restore();
        }
        const textAlign = this.textAlign;
        const isCenter = (textAlign === 'center');
        const isRight = (textAlign === 'right' || textAlign === 'end');
        const yOffset = ((displayHeight - maxHeight) / 2) + padding.top;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const metrics = lineMetrics[i];
            let tx = padding.left + metrics.left + strokeWidthHalf;
            const ty = yOffset + metrics.y;
            if (isCenter) {
                tx = displayWidth / 2;
            }
            else if (isRight) {
                tx = displayWidth - strokeWidthHalf;
            }
            if (strokeStyle) {
                ctx.strokeText(line, tx, ty);
            }
            if (fillStyle) {
                ctx.fillText(line, tx, ty);
            }
        }
        ctx.restore();
        this.texture.updateGL();
        this.dirty.setRender();
        return this;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this.setText(value);
    }
    setText(value = '') {
        if (Array.isArray(value)) {
            value = value.join('\n');
        }
        if (value !== this._text) {
            this._text = value.toString();
            this.updateText();
        }
        return this;
    }
    destroy(reparentChildren) {
        this.texture.destroy();
        this.fillStyle = null;
        this.strokeStyle = null;
        this.backgroundStyle = null;
        this.canvas = null;
        this.context = null;
        super.destroy(reparentChildren);
    }
}

export { Text };
