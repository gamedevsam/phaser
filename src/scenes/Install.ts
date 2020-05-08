import { GetConfigValue } from './GetConfigValue';
import { IScene } from './IScene';
import { ISceneConfig } from './ISceneConfig';
import { SceneManagerInstance } from './SceneManagerInstance';

export function Install (scene: IScene, config: string | ISceneConfig = {}): void
{
    const sceneManager = SceneManagerInstance.get();

    const size = sceneManager.scenes.size;
    const sceneIndex = sceneManager.sceneIndex;
    const firstScene = (size === 0);

    if (typeof config === 'string')
    {
        scene.key = config;
    }
    else if (config || (!config && firstScene))
    {
        scene.key = GetConfigValue(config, 'key', 'scene' + sceneIndex);
    }

    if (sceneManager.scenes.has(scene.key))
    {
        console.warn('Scene key already in use: ' + scene.key);
    }
    else
    {
        sceneManager.scenes.set(scene.key, scene);

        sceneManager.flush = true;

        sceneManager.sceneIndex++;
    }
}
