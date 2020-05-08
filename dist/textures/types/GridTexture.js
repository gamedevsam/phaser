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

function GridTexture(color1, color2, width = 32, height = 32, cols = 2, rows = 2) {
    const ctx = CreateCanvas(width, height);
    const colWidth = width / cols;
    const rowHeight = height / rows;
    ctx.fillStyle = color1;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = color2;
    for (let y = 0; y < rows; y++) {
        for (let x = (y % 2); x < cols; x += 2) {
            ctx.fillRect(x * colWidth, y * rowHeight, colWidth, rowHeight);
        }
    }
    return new Texture(ctx.canvas);
}

export { GridTexture };
