import { IContainer } from '../gameobjects/container/IContainer';

export function SetOrigin <T extends IContainer> (originX: number, originY: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.setOrigin(originX, originY);
    });

    return children;
}
