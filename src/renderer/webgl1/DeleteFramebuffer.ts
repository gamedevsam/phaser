import { GL } from './GL';

export function DeleteFramebuffer (framebuffer: WebGLFramebuffer): void
{
    const gl = GL.get();

    if (gl && gl.isFramebuffer(framebuffer))
    {
        gl.deleteFramebuffer(framebuffer);
    }
}
