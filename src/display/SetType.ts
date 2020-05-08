import { IGameObject } from '../gameobjects/IGameObject';

export function SetType <T extends IGameObject> (type: string, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.type = type;
    });

    return children;
}
