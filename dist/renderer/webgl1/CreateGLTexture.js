import { GL } from './GL.js';
import { IsSizePowerOfTwo } from '../../math/pow2/IsSizePowerOfTwo.js';

function CreateGLTexture(source, width, height, potClamp = true, linear = true) {
    const gl = GL.get();
    if (!gl) {
        return;
    }
    const glTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, glTexture);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    if (source) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        width = source.width;
        height = source.height;
    }
    else {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }
    const mode = (linear) ? gl.LINEAR : gl.NEAREST;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mode);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mode);
    const pot = (source && IsSizePowerOfTwo(width, height));
    const wrap = (pot && potClamp) ? gl.REPEAT : gl.CLAMP_TO_EDGE;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
    if (pot) {
        gl.generateMipmap(gl.TEXTURE_2D);
    }
    return glTexture;
}

export { CreateGLTexture };
