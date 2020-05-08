import { IGameObject } from '../gameobjects/IGameObject';
import { SetParent } from './SetParent';

export function AddChildrenAt <T extends IGameObject> (parent: IGameObject, index: number, ...children: T[]): T[]
{
    const parentChildren = parent.children;

    if (index >= 0 && index <= parentChildren.length)
    {
        children.reverse().forEach(child =>
        {
            SetParent(parent, child);

            children.splice(index, 0, child);

            child.transform.updateWorld();
        });
    }

    return children;
}
