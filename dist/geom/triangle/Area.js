function Area(triangle) {
    const { x1, y1, x2, y2, x3, y3 } = triangle;
    return Math.abs(((x3 - x1) * (y2 - y1) - (x2 - x1) * (y3 - y1)) / 2);
}

export { Area };
