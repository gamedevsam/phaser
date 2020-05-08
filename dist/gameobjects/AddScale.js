function AddScale(scaleX, scaleY, ...child) {
    child.forEach(entity => {
        entity.scaleX += scaleX;
        entity.scaleY += scaleY;
    });
}

export { AddScale };
