import { GetChildIndex } from './GetChildIndex.js';

function SendChildToBack(parent, child) {
    const parentChildren = parent.children;
    const currentIndex = GetChildIndex(parent, child);
    if (currentIndex !== -1 && currentIndex > 0) {
        parentChildren.splice(currentIndex, 1);
        parentChildren.unshift(child);
        child.dirty.setRender();
    }
    return child;
}

export { SendChildToBack };
