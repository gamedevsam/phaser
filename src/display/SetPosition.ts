import { IContainer } from '../gameobjects/container/IContainer';

export function SetPosition <T extends IContainer> (x: number, y: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.setPosition(x, y);
    });

    return children;
}
