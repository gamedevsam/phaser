import { IParent } from '../gameobjects/container/IParent';
import { Rectangle } from '../geom/rectangle/Rectangle';
import { WebGLRenderer } from '../renderer/webgl1/WebGLRenderer';
import { IScene } from '../scenes/IScene';

export interface IStaticCamera
{
    scene: IScene;
    matrix: Float32Array;
    renderer: WebGLRenderer;
    bounds: Rectangle;
    reset (): void;
    render (gameFrame: number): void;
    destroy (reparentChildren?: IParent): void;
}
