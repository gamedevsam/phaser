import { GetChildIndex } from './GetChildIndex.js';

function MoveChildUp(parent, child) {
    const parentChildren = parent.children;
    const currentIndex = GetChildIndex(parent, child);
    if (currentIndex !== -1 && currentIndex > 0) {
        const child2 = parentChildren[currentIndex + 1];
        const index2 = parentChildren.indexOf(child2);
        parentChildren[currentIndex] = child2;
        parentChildren[index2] = child;
        child.dirty.setRender();
        child2.dirty.setRender();
    }
    return child;
}

export { MoveChildUp };
