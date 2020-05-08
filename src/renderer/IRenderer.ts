import { ISceneRenderData } from '../scenes/ISceneRenderData';
import { ISprite } from '../gameobjects/sprite/ISprite';
import { ISpriteBatch } from '../gameobjects/spritebatch/ISpriteBatch';

export interface IRenderer
{
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    resolution: number;
    textureIndex: number[];
    flushTotal: number;
    render (renderData: ISceneRenderData): void;
    batchSprite <T extends ISprite> (renderable: T): void;
    batchSpriteBuffer <T extends ISpriteBatch> (batch: T): void;
}
