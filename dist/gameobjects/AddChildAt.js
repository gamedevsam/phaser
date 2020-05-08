import './GetChildIndex.js';
import './RemoveChild.js';
import { SetParent } from './SetParent.js';
import '../math/matrix2d/Copy.js';
import { UpdateWorldTransform } from './components/transform/UpdateWorldTransform.js';

function AddChildAt(parent, index, child) {
    const children = parent.children;
    if (index >= 0 && index <= children.length) {
        SetParent(parent, child);
        children.splice(index, 0, child);
        UpdateWorldTransform(child);
    }
    return child;
}

export { AddChildAt };
