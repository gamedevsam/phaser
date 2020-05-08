import '../../renderer/webgl1/GL.js';
import { CreateCanvas } from '../CreateCanvas.js';
import '../../math/pow2/IsSizePowerOfTwo.js';
import '../../renderer/webgl1/CreateGLTexture.js';
import '../../renderer/webgl1/DeleteFramebuffer.js';
import '../../renderer/webgl1/DeleteGLTexture.js';
import '../Frame.js';
import '../../renderer/webgl1/SetGLTextureFilterMode.js';
import '../../renderer/webgl1/UpdateGLTexture.js';
import { Texture } from '../Texture.js';
import { Arne16 } from '../palettes/Arne16.js';

function PixelTexture(config) {
    const { data = [], palette = Arne16, pixelWidth = 1, pixelHeight = pixelWidth, preRender = null, postRender = null } = config;
    let { canvas = null, resizeCanvas = true, clearCanvas = true } = config;
    const width = Math.floor(Math.abs(data[0].length * pixelWidth));
    const height = Math.floor(Math.abs(data.length * pixelHeight));
    if (!canvas) {
        canvas = CreateCanvas(width, height).canvas;
        resizeCanvas = false;
        clearCanvas = false;
    }
    if (resizeCanvas) {
        canvas.width = width;
        canvas.height = height;
    }
    const ctx = canvas.getContext('2d');
    if (clearCanvas) {
        ctx.clearRect(0, 0, width, height);
    }
    if (preRender) {
        preRender(canvas, ctx);
    }
    for (let y = 0; y < data.length; y++) {
        const row = data[y];
        for (let x = 0; x < row.length; x++) {
            const d = row[x];
            if (d !== '.' && d !== ' ') {
                ctx.fillStyle = palette[parseInt('0x' + d.toUpperCase())];
                ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
            }
        }
    }
    if (postRender) {
        postRender(canvas, ctx);
    }
    return new Texture(canvas);
}

export { PixelTexture };
