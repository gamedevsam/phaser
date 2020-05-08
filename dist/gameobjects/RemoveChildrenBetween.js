function RemoveChildrenBetween(parent, beginIndex = 0, endIndex) {
    const children = parent.children;
    if (endIndex === undefined) {
        endIndex = children.length;
    }
    const range = endIndex - beginIndex;
    if (range > 0 && range <= endIndex) {
        const removed = children.splice(beginIndex, range);
        removed.forEach(child => {
            child.parent = null;
        });
        return removed;
    }
    else {
        return [];
    }
}

export { RemoveChildrenBetween };
