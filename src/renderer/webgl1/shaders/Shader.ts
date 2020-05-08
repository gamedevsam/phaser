import { IShaderConfig } from './IShaderConfig';
import { SingleTextureQuadShader } from './SingleTextureQuadShader';
import { WebGLRenderer } from '../WebGLRenderer';

const fragmentShader = `
precision highp float;

varying vec2 vTextureCoord;
varying float vTextureId;
varying vec4 vTintColor;

uniform sampler2D uTexture;

void main (void)
{
    vec4 color = texture2D(uTexture, vTextureCoord);

    gl_FragColor = color * vec4(vTintColor.bgr * vTintColor.a, vTintColor.a);
}`;

export class Shader extends SingleTextureQuadShader
{
    renderer: WebGLRenderer;
    gl: WebGLRenderingContext;

    program: WebGLProgram;

    constructor (renderer: WebGLRenderer, config: IShaderConfig = {})
    {
        config.fragmentShader = fragmentShader;

        super(renderer, config);
    }
}
