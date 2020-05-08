import { IContainer } from '../gameobjects/container/IContainer';

export function SetSize <T extends IContainer> (width: number, height: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.setSize(width, height);
    });

    return children;
}
