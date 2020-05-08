function RotateChildrenRight(parent, total = 1) {
    const parentChildren = parent.children;
    let child = null;
    for (let i = 0; i < total; i++) {
        child = parentChildren.pop();
        parentChildren.unshift(child);
        child.dirty.setRender();
    }
    return child;
}

export { RotateChildrenRight };
