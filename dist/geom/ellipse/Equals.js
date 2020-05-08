function Equals(ellipse, toCompare) {
    return (ellipse.x === toCompare.x &&
        ellipse.y === toCompare.y &&
        ellipse.width === toCompare.width &&
        ellipse.height === toCompare.height);
}

export { Equals };
