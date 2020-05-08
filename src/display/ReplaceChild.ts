import { AddChildAt } from './AddChildAt';
import { GetChildIndex } from './GetChildIndex';
import { IGameObject } from '../gameobjects/IGameObject';
import { MoveChildTo } from './MoveChildTo';
import { RemoveChild } from './RemoveChild';

//  Replaces the `target` child with the `source` child.
//  Both children are removed from their parents.
//  Source is then moved to the parent of the target.
//  Target is left without a parent after this call.
//  If both children have the same parent, target is removed from the parent and source is moved to the position target previously held.
//  Target is returned.

export function ReplaceChild <T extends IGameObject> (target: T, source: T): T
{
    const targetParent = target.parent;
    const sourceParent = source.parent;
    const targetIndex = GetChildIndex(targetParent, target);

    if (targetParent === sourceParent)
    {
        //  Remove target from parent and move source to targets position
        MoveChildTo(targetParent, source, targetIndex);
        RemoveChild(targetParent, target);
    }
    else
    {
        //  They have different parents
        RemoveChild(targetParent, target);
        RemoveChild(sourceParent, source);

        AddChildAt(targetParent, targetIndex, source);
    }

    return target;
}
