import { IGameObject } from '../gameobjects/IGameObject';

export function SetBounds <T extends IGameObject> (x: number, y: number, width: number, height: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.bounds.set(x, y, width, height);
    });

    return children;
}
