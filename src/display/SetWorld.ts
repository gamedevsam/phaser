import { Emit } from '../events/Emit';
import { IBaseWorld } from '../world/IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';

export function SetWorld <T extends IGameObject> (world: IBaseWorld, ...children: T[]): T[]
{
    const worldScene = world.scene;

    children.forEach(child =>
    {
        if (child.world)
        {
            Emit(child.world.scene, 'removedfromworld', child, child.world);
        }

        child.world = world;

        Emit(worldScene, 'addedtoworld', child, world);
    });

    return children;
}
