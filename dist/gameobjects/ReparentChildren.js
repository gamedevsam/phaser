import './GetChildIndex.js';
import './RemoveChild.js';
import { SetParent } from './SetParent.js';
import { RemoveChildrenBetween } from './RemoveChildrenBetween.js';

function ReparentChildren(parent, newParent, beginIndex = 0, endIndex) {
    const moved = RemoveChildrenBetween(parent, beginIndex, endIndex);
    moved.forEach(child => {
        SetParent(newParent, child);
    });
    return moved;
}

export { ReparentChildren };
