import { GetChildIndex } from './GetChildIndex.js';

function RemoveChild(parent, child) {
    const children = parent.children;
    const currentIndex = GetChildIndex(parent, child);
    if (currentIndex > -1) {
        children.splice(currentIndex, 1);
        child.parent = null;
    }
    return child;
}

export { RemoveChild };
