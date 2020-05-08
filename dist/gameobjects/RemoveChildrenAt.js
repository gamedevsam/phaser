import { GetChildAt } from './GetChildAt.js';

function RemoveChildrenAt(parent, ...index) {
    const children = parent.children;
    const removed = [];
    index.sort((a, b) => a - b);
    index.reverse().forEach(entity => {
        const child = GetChildAt(parent, entity);
        if (child) {
            children.splice(entity, 1);
            child.parent = null;
            removed.push(child);
        }
    });
    return removed;
}

export { RemoveChildrenAt };
