function Slope(line) {
    const { x1, y1, x2, y2 } = line;
    return (y2 - y1) / (x2 - x1);
}

export { Slope };
