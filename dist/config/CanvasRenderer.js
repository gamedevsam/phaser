import './BackgroundColor.js';
import './CanvasContext.js';
import './Size.js';
import '../gameobjects/sprite/RenderCanvas.js';
import { CanvasRenderer as CanvasRenderer$1 } from '../renderer/canvas/CanvasRenderer.js';
import { SetRenderer } from './SetRenderer.js';

function CanvasRenderer() {
    return () => {
        SetRenderer(CanvasRenderer$1);
    };
}

export { CanvasRenderer };
