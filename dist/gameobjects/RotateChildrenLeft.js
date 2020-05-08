function RotateChildrenLeft(parent, total = 1) {
    const parentChildren = parent.children;
    let child = null;
    for (let i = 0; i < total; i++) {
        child = parentChildren.shift();
        parentChildren.push(child);
        child.dirty.setRender();
    }
    return child;
}

export { RotateChildrenLeft };
