import { ITransformGameObject } from '../gameobjects/transformgameobject/ITransformGameObject';
import { Rectangle } from '../geom/rectangle/Rectangle';
import { WebGLRenderer } from '../renderer/webgl1/WebGLRenderer';
import { IScene } from '../scenes/IScene';
import { IStaticCamera } from './IStaticCamera';

export interface ICamera extends ITransformGameObject, IStaticCamera
{
    scene: IScene;
    matrix: Float32Array;
    renderer: WebGLRenderer;
    dirtyRender: boolean;
    bounds: Rectangle;
    reset (): void;
    update (delta: number, time: number): void;
    render (gameFrame: number): void;
}
