import { GL } from './GL.js';

function UpdateGLTexture(source, dstTexture, flipY = false) {
    const gl = GL.get();
    const width = source.width;
    const height = source.height;
    if (width > 0 && height > 0) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, dstTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    }
}

export { UpdateGLTexture };
