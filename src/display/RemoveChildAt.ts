import { IGameObject } from '../gameobjects/IGameObject';

export function RemoveChildAt (parent: IGameObject, index: number): IGameObject | undefined
{
    const children = parent.children;
    let child: IGameObject;

    if (index >= 0 && index < children.length)
    {
        const removed = children.splice(index, 1);

        if (removed[0])
        {
            child = removed[0];
            child.parent = null;
        }
    }

    return child;
}
