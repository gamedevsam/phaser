import { IContainer } from '../gameobjects/container/IContainer';

export function SetScale <T extends IContainer> (scaleX: number, scaleY: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        child.setScale(scaleX, scaleY);
    });

    return children;
}
