import { GL } from './GL.js';

function DeleteGLTexture(texture) {
    const gl = GL.get();
    if (!gl) {
        return;
    }
    if (gl.isTexture(texture)) {
        gl.deleteTexture(texture);
    }
}

export { DeleteGLTexture };
