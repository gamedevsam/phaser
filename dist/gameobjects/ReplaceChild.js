import { GetChildIndex } from './GetChildIndex.js';
import { RemoveChild } from './RemoveChild.js';
import './SetParent.js';
import '../math/matrix2d/Copy.js';
import './components/transform/UpdateWorldTransform.js';
import { AddChildAt } from './AddChildAt.js';
import { MoveChildTo } from './MoveChildTo.js';

function ReplaceChild(target, source) {
    const targetParent = target.parent;
    const sourceParent = source.parent;
    const targetIndex = GetChildIndex(targetParent, target);
    if (targetParent === sourceParent) {
        MoveChildTo(targetParent, source, targetIndex);
        RemoveChild(targetParent, target);
    }
    else {
        RemoveChild(targetParent, target);
        RemoveChild(sourceParent, source);
        AddChildAt(targetParent, targetIndex, source);
    }
    return target;
}

export { ReplaceChild };
