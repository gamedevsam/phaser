import { IRenderer } from './IRenderer';

export interface IRendererConstructor
{
    new (): IRenderer;
}
