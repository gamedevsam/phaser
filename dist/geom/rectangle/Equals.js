function Equals(rect, toCompare) {
    return (rect.x === toCompare.x &&
        rect.y === toCompare.y &&
        rect.width === toCompare.width &&
        rect.height === toCompare.height);
}

export { Equals };
