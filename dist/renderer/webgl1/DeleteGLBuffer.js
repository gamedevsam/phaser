import { GL } from './GL.js';

function DeleteGLBuffer(buffer) {
    const gl = GL.get();
    if (gl.isBuffer(buffer)) {
        gl.deleteBuffer(buffer);
    }
}

export { DeleteGLBuffer };
