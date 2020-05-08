function PerpSlope(line) {
    const { x1, y1, x2, y2 } = line;
    return -((x2 - x1) / (y2 - y1));
}

export { PerpSlope };
