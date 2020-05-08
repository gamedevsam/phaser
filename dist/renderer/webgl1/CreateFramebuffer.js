import { GL } from './GL.js';
import '../../math/pow2/IsSizePowerOfTwo.js';
import { CreateGLTexture } from './CreateGLTexture.js';

function CreateFramebuffer(width, height) {
    const gl = GL.get();
    const texture = CreateGLTexture(null, width, height);
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return [texture, framebuffer];
}

export { CreateFramebuffer };
