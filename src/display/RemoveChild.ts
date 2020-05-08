import { GetChildIndex } from './GetChildIndex';
import { IGameObject } from '../gameobjects/IGameObject';

export function RemoveChild <T extends IGameObject> (parent: IGameObject, child: T): T
{
    const children = parent.children;

    const currentIndex = GetChildIndex(parent, child);

    if (currentIndex > -1)
    {
        children.splice(currentIndex, 1);

        child.parent = null;
    }

    return child;
}
