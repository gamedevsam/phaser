import { IGameObject } from '../gameobjects/IGameObject';

export function GetRandomChild (parent: IGameObject, startIndex: number = 0, length?: number): IGameObject
{
    const children = parent.children;

    if (!length)
    {
        length = children.length;
    }

    const randomIndex = startIndex + Math.floor(Math.random() * length);

    return children[randomIndex];
}
