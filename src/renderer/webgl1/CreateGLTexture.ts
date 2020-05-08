import { GL } from './GL';
import { IGLTextureBinding } from '../../textures/IGLTextureBinding';

export function CreateGLTexture (binding: IGLTextureBinding): WebGLTexture
{
    const gl = GL.get();

    if (!gl)
    {
        return;
    }

    const parent = binding.parent;
    const source = parent.image;

    let width = parent.width;
    let height = parent.height;

    const glTexture: WebGLTexture = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, glTexture);

    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, binding.unpackPremultiplyAlpha);

    if (source)
    {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

        width = source.width;
        height = source.height;
    }
    else
    {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, binding.minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, binding.magFilter);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, binding.wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, binding.wrapT);

    if (binding.generateMipmap && binding.isPOT)
    {
        gl.generateMipmap(gl.TEXTURE_2D);
    }

    binding.texture = glTexture;

    return glTexture;
}
