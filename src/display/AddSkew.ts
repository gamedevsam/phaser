import { IContainer } from '../gameobjects/container/IContainer';

export function AddSkew <T extends IContainer> (skewX: number, skewY: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.skewX += skewX;
        child.skewY += skewY;
    });

    return children;
}
