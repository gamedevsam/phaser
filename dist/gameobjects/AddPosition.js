function AddPosition(x, y, ...child) {
    child.forEach(entity => {
        entity.x += x;
        entity.y += y;
    });
}

export { AddPosition };
