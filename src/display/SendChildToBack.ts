import { GetChildIndex } from './GetChildIndex';
import { IGameObject } from '../gameobjects/IGameObject';

export function SendChildToBack <T extends IGameObject> (parent: IGameObject, child: T): T
{
    const parentChildren = parent.children;

    const currentIndex = GetChildIndex(parent, child);

    if (currentIndex !== -1 && currentIndex > 0)
    {
        parentChildren.splice(currentIndex, 1);
        parentChildren.unshift(child);

        child.dirty.setRender();
    }

    return child;
}
