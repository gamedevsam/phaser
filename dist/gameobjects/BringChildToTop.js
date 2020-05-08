import { GetChildIndex } from './GetChildIndex.js';

function BringChildToTop(parent, child) {
    const parentChildren = parent.children;
    const currentIndex = GetChildIndex(parent, child);
    if (currentIndex !== -1 && currentIndex < parentChildren.length) {
        parentChildren.splice(currentIndex, 1);
        parentChildren.push(child);
        child.dirty.setRender();
    }
    return child;
}

export { BringChildToTop };
