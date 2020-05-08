import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChild } from './RemoveChild';
import { SetWorld } from './SetWorld';

export function SetParent <T extends IGameObject> (parent: IGameObject, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        if (child.parent)
        {
            RemoveChild(child.parent, child);
        }

        child.parent = parent;
    });

    const parentWorld = parent.world;

    if (parentWorld)
    {
        SetWorld(parentWorld, ...children);
    }

    return children;
}
