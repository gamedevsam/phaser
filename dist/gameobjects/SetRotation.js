function SetRotation(rotation, ...child) {
    child.forEach(entity => {
        entity.rotation = rotation;
    });
}

export { SetRotation };
