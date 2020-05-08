import { IGameObject } from '../gameobjects/IGameObject';
import { RemoveChild } from './RemoveChild';

export function RemoveChildren <T extends IGameObject> (parent: IGameObject, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        RemoveChild(parent, child);
    });

    return children;
}
