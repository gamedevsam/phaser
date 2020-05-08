import '../../renderer/webgl1/GL.js';
import '../../math/pow2/IsSizePowerOfTwo.js';
import '../../renderer/webgl1/CreateGLTexture.js';
import '../../renderer/webgl1/DeleteFramebuffer.js';
import '../../renderer/webgl1/DeleteGLTexture.js';
import '../../textures/Frame.js';
import '../../renderer/webgl1/SetGLTextureFilterMode.js';
import '../../renderer/webgl1/UpdateGLTexture.js';
import { Texture } from '../../textures/Texture.js';
import { TextureManagerInstance } from '../../textures/TextureManagerInstance.js';
import { SetFrame } from './SetFrame.js';

function SetTexture(key, frame, ...sprite) {
    if (!key) {
        return;
    }
    let texture;
    if (key instanceof Texture) {
        texture = key;
    }
    else {
        texture = TextureManagerInstance.get().get(key);
    }
    if (!texture) {
        console.warn('Invalid Texture key: ' + key);
        return;
    }
    else {
        if (!texture.glTexture) {
            texture.createGL();
        }
        sprite.forEach(entity => {
            entity.texture = texture;
            SetFrame(texture, frame, entity);
        });
    }
}

export { SetTexture };
