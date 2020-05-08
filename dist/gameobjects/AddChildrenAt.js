import './GetChildIndex.js';
import './RemoveChild.js';
import { SetParent } from './SetParent.js';
import '../math/matrix2d/Copy.js';
import { UpdateWorldTransform } from './components/transform/UpdateWorldTransform.js';

function AddChildrenAt(parent, index, ...children) {
    const parentChildren = parent.children;
    if (index >= 0 && index <= parentChildren.length) {
        children.reverse().forEach(child => {
            SetParent(parent, child);
            children.splice(index, 0, child);
            UpdateWorldTransform(child);
        });
    }
    return children;
}

export { AddChildrenAt };
