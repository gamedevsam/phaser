import { IContainer } from '../gameobjects/container/IContainer';

export function AddScale <T extends IContainer> (scaleX: number, scaleY: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.scaleX += scaleX;
        child.scaleY += scaleY;
    });

    return children;
}
