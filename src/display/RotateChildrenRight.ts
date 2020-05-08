import { IGameObject } from '../gameobjects/IGameObject';

export function RotateChildrenRight (parent: IGameObject, total: number = 1): IGameObject
{
    const parentChildren = parent.children;

    let child = null;

    for (let i: number = 0; i < total; i++)
    {
        child = parentChildren.pop();

        parentChildren.unshift(child);

        child.dirty.setRender();
    }

    return child;
}
