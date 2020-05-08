import { IGameObject } from '../gameobjects/IGameObject';
import { SetParent } from './SetParent';

export function AddChildren <T extends IGameObject> (parent: IGameObject, ...children: T[]): T[]
{
    SetParent(parent, ...children);

    children.forEach(child =>
    {
        parent.children.push(child);

        child.transform.updateWorld();
    });

    return children;
}
