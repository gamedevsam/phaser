import { ITexture } from '../textures/ITexture';

const queue: ITexture[] = [];

export const BindingQueue =
{
    add: (texture: ITexture): void =>
    {
        queue.push(texture);
    },

    get: (): ITexture[] =>
    {
        return queue;
    },

    clear: (): void =>
    {
        queue.length = 0;
    }
};
