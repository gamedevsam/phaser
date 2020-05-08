import { IRendererConstructor } from '../renderer/IRendererConstructor';

let instance: IRendererConstructor;

function SetRenderer (renderer: IRendererConstructor): void
{
    instance = renderer;
}

function GetRenderer (): IRendererConstructor
{
    return instance;
}

export {
    GetRenderer,
    SetRenderer
};
