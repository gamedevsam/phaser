import { GetChildAt } from './GetChildAt';
import { IGameObject } from '../gameobjects/IGameObject';

export function RemoveChildrenAt (parent: IGameObject, ...index: number[]): IGameObject[]
{
    const children = parent.children;
    const removed: IGameObject[] = [];

    //  Sort into numeric order
    index.sort((a, b) => a - b);

    //  Work through the array in reverse
    index.reverse().forEach(entity =>
    {
        const child = GetChildAt(parent, entity);

        if (child)
        {
            children.splice(entity, 1);

            child.parent = null;

            removed.push(child);
        }
    });

    return removed;
}
