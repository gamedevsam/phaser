import './BackgroundColor.js';
import './Size.js';
import { SetRenderer } from './SetRenderer.js';
import './WebGLContext.js';
import '../renderer/webgl1/shaders/CheckShaderMaxIfStatements.js';
import '../renderer/webgl1/GL.js';
import '../math/matrix2d-funcs/ExactEquals.js';
import '../renderer/webgl1/shaders/MultiTextureQuadShader.js';
import '../renderer/webgl1/Ortho.js';
import '../gameobjects/sprite/UploadBuffers.js';
import '../gameobjects/sprite/RenderWebGL.js';
import { WebGLRenderer as WebGLRenderer$1 } from '../renderer/webgl1/WebGLRenderer.js';

function WebGLRenderer() {
    return () => {
        SetRenderer(WebGLRenderer$1);
    };
}

export { WebGLRenderer };
