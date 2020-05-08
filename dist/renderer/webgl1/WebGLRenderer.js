import { GetBackgroundColor } from '../../config/BackgroundColor.js';
import { GetWidth, GetHeight, GetResolution } from '../../config/Size.js';
import { GetWebGLContext } from '../../config/WebGLContext.js';
import { CheckShaderMaxIfStatements } from './shaders/CheckShaderMaxIfStatements.js';
import { GL } from './GL.js';
import { ExactEquals } from '../../math/matrix2d-funcs/ExactEquals.js';
import { MultiTextureQuadShader } from './shaders/MultiTextureQuadShader.js';
import { Ortho } from './Ortho.js';
import '../../gameobjects/sprite/UploadBuffers.js';
import { RenderWebGL } from '../../gameobjects/sprite/RenderWebGL.js';

class WebGLRenderer {
    constructor() {
        this.clearColor = [0, 0, 0, 1];
        this.flushTotal = 0;
        this.maxTextures = 0;
        this.currentActiveTexture = 0;
        this.startActiveTexture = 0;
        this.tempTextures = [];
        this.clearBeforeRender = true;
        this.optimizeRedraw = true;
        this.autoResize = true;
        this.contextLost = false;
        this.width = GetWidth();
        this.height = GetHeight();
        this.resolution = GetResolution();
        this.setBackgroundColor(GetBackgroundColor());
        const canvas = document.createElement('canvas');
        canvas.addEventListener('webglcontextlost', (event) => this.onContextLost(event), false);
        canvas.addEventListener('webglcontextrestored', () => this.onContextRestored(), false);
        this.canvas = canvas;
        this.initContext();
        this.shader = new MultiTextureQuadShader(this);
    }
    initContext() {
        const gl = this.canvas.getContext('webgl', GetWebGLContext());
        GL.set(gl);
        this.gl = gl;
        this.elementIndexExtension = gl.getExtension('OES_element_index_uint');
        this.getMaxTextures();
        if (this.shader) {
            this.shader.gl = gl;
        }
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
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
        this.gl.viewport(0, 0, this.width, this.height);
        this.projectionMatrix = Ortho(width, height);
    }
    onContextLost(event) {
        event.preventDefault();
        this.contextLost = true;
    }
    onContextRestored() {
        this.contextLost = false;
        this.initContext();
    }
    setBackgroundColor(color) {
        const clearColor = this.clearColor;
        const r = color >> 16 & 0xFF;
        const g = color >> 8 & 0xFF;
        const b = color & 0xFF;
        const a = (color > 16777215) ? color >>> 24 : 255;
        clearColor[0] = r / 255;
        clearColor[1] = g / 255;
        clearColor[2] = b / 255;
        clearColor[3] = a / 255;
        return this;
    }
    getMaxTextures() {
        const gl = this.gl;
        const maxTextures = CheckShaderMaxIfStatements(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS), gl);
        const tempTextures = this.tempTextures;
        if (tempTextures.length) {
            tempTextures.forEach(texture => {
                gl.deleteTexture(texture);
            });
        }
        for (let texturesIndex = 0; texturesIndex < maxTextures; texturesIndex++) {
            const tempTexture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0 + texturesIndex);
            gl.bindTexture(gl.TEXTURE_2D, tempTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
            tempTextures[texturesIndex] = tempTexture;
        }
        this.maxTextures = maxTextures;
        this.textureIndex = Array.from(Array(maxTextures).keys());
        this.activeTextures = Array(maxTextures);
        this.currentActiveTexture = 0;
    }
    reset(framebuffer = null, width = this.width, height = this.height) {
        const gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.viewport(0, 0, width, height);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        this.currentActiveTexture = 0;
        this.startActiveTexture++;
        this.flushTotal = 0;
    }
    render(renderData) {
        if (this.contextLost) {
            return;
        }
        const gl = this.gl;
        this.reset();
        if (this.optimizeRedraw && renderData.numDirtyFrames === 0 && renderData.numDirtyCameras === 0) {
            return;
        }
        const shader = this.shader;
        const cls = this.clearColor;
        if (this.clearBeforeRender) {
            gl.clearColor(cls[0], cls[1], cls[2], cls[3]);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        const projectionMatrix = this.projectionMatrix;
        let prevCamera;
        const worlds = renderData.worldData;
        for (let i = 0; i < worlds.length; i++) {
            const { camera, renderList, numRendered } = worlds[i];
            if (!prevCamera || !ExactEquals(camera.worldTransform, prevCamera.worldTransform)) {
                shader.flush();
                shader.bind(projectionMatrix, camera.matrix);
                prevCamera = camera;
            }
            for (let s = 0; s < numRendered; s++) {
                RenderWebGL(renderList[s], this, shader, this.startActiveTexture);
            }
        }
        shader.flush();
    }
    resetTextures(texture) {
        const gl = this.gl;
        const active = this.activeTextures;
        active.fill(null);
        this.currentActiveTexture = 0;
        this.startActiveTexture++;
        if (texture) {
            active[0] = texture;
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture.glTexture);
            this.currentActiveTexture = 1;
        }
    }
    requestTexture(texture) {
        const gl = this.gl;
        texture.glIndexCounter = this.startActiveTexture;
        if (this.currentActiveTexture < this.maxTextures) {
            this.activeTextures[this.currentActiveTexture] = texture;
            texture.glIndex = this.currentActiveTexture;
            gl.activeTexture(gl.TEXTURE0 + this.currentActiveTexture);
            gl.bindTexture(gl.TEXTURE_2D, texture.glTexture);
            this.currentActiveTexture++;
        }
        else {
            this.shader.flush();
            this.resetTextures(texture);
        }
    }
}

export { WebGLRenderer };
