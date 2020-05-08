function AddRotation(rotation, ...child) {
    child.forEach(entity => {
        entity.rotation += rotation;
    });
}

export { AddRotation };
