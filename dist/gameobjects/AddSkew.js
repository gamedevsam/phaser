function AddSkew(skewX, skewY, ...child) {
    child.forEach(entity => {
        entity.skewX += skewX;
        entity.skewY += skewY;
    });
}

export { AddSkew };
