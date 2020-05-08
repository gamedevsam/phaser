import { TextureManager } from './TextureManager';

let instance: TextureManager;

export const TextureManagerInstance =
{
    get: (): TextureManager =>
    {
        return instance;
    },

    set: (manager: TextureManager | null): void =>
    {
        instance = manager;
    }
};
