//  From Pixi v5

const fragTemplate = [
    'precision mediump float;',
    'void main(void){',
    'float test = 0.1;',
    '%forloop%',
    'gl_FragColor = vec4(0.0);',
    '}'
].join('\n');

function GenerateSrc (maxIfs: number): string
{
    let src = '';

    for (let i = 0; i < maxIfs; ++i)
    {
        if (i > 0)
        {
            src += '\nelse ';
        }

        if (i < maxIfs - 1)
        {
            src += `if(test == ${i}.0){}`;
        }
    }

    return src;
}

export function CheckShaderMaxIfStatements (maxIfs: number, gl: WebGLRenderingContext): number
{
    const shader = gl.createShader(gl.FRAGMENT_SHADER);

    // eslint-disable-next-line no-constant-condition
    while (true)
    {
        const fragmentSrc = fragTemplate.replace(/%forloop%/gi, GenerateSrc(maxIfs));

        gl.shaderSource(shader, fragmentSrc);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        {
            maxIfs = (maxIfs / 2) | 0;
        }
        else
        {
            // valid!
            break;
        }
    }

    return maxIfs;
}
