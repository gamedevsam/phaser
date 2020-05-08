function SetBounds(x, y, width, height, ...child) {
    child.forEach(entity => {
        entity.bounds.setArea(x, y, width, height);
    });
}

export { SetBounds };
