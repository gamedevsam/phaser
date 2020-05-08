import { GL } from './GL';

export function DeleteGLTexture (texture: WebGLTexture): void
{
    const gl = GL.get();

    if (!gl)
    {
        return;
    }

    if (gl.isTexture(texture))
    {
        gl.deleteTexture(texture);
    }
}
