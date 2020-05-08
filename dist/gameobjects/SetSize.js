function SetSize(width, height, ...child) {
    child.forEach(entity => {
        entity.transform.setSize(width, height);
    });
}

export { SetSize };
