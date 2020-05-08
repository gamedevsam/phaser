import { GetBackgroundColor } from '../../config/BackgroundColor.js';
import { GetCanvasContext } from '../../config/CanvasContext.js';
import { GetWidth, GetHeight, GetResolution } from '../../config/Size.js';
import { RenderCanvas } from '../../gameobjects/sprite/RenderCanvas.js';

class CanvasRenderer {
    constructor() {
        this.clearBeforeRender = true;
        this.optimizeRedraw = true;
        this.autoResize = true;
        this.width = GetWidth();
        this.height = GetHeight();
        this.resolution = GetResolution();
        this.setBackgroundColor(GetBackgroundColor());
        const canvas = document.createElement('canvas');
        this.canvas = canvas;
        this.initContext();
    }
    initContext() {
        const ctx = this.canvas.getContext('2d', GetCanvasContext());
        this.ctx = ctx;
        this.resize(this.width, this.height, this.resolution);
    }
    resize(width, height, resolution = 1) {
        this.width = width * resolution;
        this.height = height * resolution;
        this.resolution = resolution;
        const canvas = this.canvas;
        canvas.width = this.width;
        canvas.height = this.height;
        if (this.autoResize) {
            canvas.style.width = this.width / resolution + 'px';
            canvas.style.height = this.height / resolution + 'px';
        }
    }
    setBackgroundColor(color) {
        const r = color >> 16 & 0xFF;
        const g = color >> 8 & 0xFF;
        const b = color & 0xFF;
        const a = (color > 16777215) ? color >>> 24 : 255;
        this.clearColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        return this;
    }
    reset() {
        const ctx = this.ctx;
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    render(renderData) {
        const ctx = this.ctx;
        if (this.optimizeRedraw && renderData.numDirtyFrames === 0 && renderData.numDirtyCameras === 0) {
            return;
        }
        this.reset();
        if (this.clearBeforeRender) {
            ctx.clearRect(0, 0, this.width, this.height);
            ctx.fillStyle = this.clearColor;
            ctx.fillRect(0, 0, this.width, this.height);
        }
        const worlds = renderData.worldData;
        for (let i = 0; i < worlds.length; i++) {
            const { camera, renderList, numRendered } = worlds[i];
            const { a, b, c, d, tx, ty } = camera.worldTransform;
            ctx.setTransform(a, b, c, d, tx, ty);
            for (let s = 0; s < numRendered; s++) {
                RenderCanvas(renderList[s], ctx);
            }
        }
    }
}

export { CanvasRenderer };
