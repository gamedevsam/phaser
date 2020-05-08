import { WebGLRenderer as Renderer } from '../renderer/webgl1/WebGLRenderer';
import { SetRenderer } from './SetRenderer';

function WebGLRenderer (): () => void
{
    return (): void =>
    {
        SetRenderer(Renderer);
    };
}

export {
    WebGLRenderer
};
