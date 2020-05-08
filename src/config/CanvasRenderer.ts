import { CanvasRenderer as Renderer } from '../renderer/canvas/CanvasRenderer';
import { SetRenderer } from './SetRenderer';

function CanvasRenderer (): () => void
{
    return (): void =>
    {
        SetRenderer(Renderer);
    };
}

export {
    CanvasRenderer
};
