import { SceneManager } from './SceneManager';

let instance: SceneManager;

export const SceneManagerInstance =
{
    get: (): SceneManager =>
    {
        return instance;
    },

    set: (manager: SceneManager | null): void =>
    {
        instance = manager;
    }
};
