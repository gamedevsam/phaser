import { RemoveChildrenBetween } from './RemoveChildrenBetween.js';

function DestroyChildren(parent, beginIndex = 0, endIndex) {
    const removed = RemoveChildrenBetween(parent, beginIndex, endIndex);
    removed.forEach(child => {
        child.destroy();
    });
}

export { DestroyChildren };
