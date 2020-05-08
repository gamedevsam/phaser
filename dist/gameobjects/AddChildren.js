import './GetChildIndex.js';
import './RemoveChild.js';
import { SetParent } from './SetParent.js';
import '../math/matrix2d/Copy.js';
import { UpdateWorldTransform } from './components/transform/UpdateWorldTransform.js';

function AddChildren(parent, ...children) {
    children.forEach(child => {
        SetParent(parent, child);
        parent.children.push(child);
        UpdateWorldTransform(child);
    });
    return children;
}

export { AddChildren };
