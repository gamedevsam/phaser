function GetShortestDistance(line, point) {
    const { x1, y1, x2, y2 } = line;
    const L2 = (((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    if (L2 === 0) {
        return 0;
    }
    const s = (((y1 - point.y) * (x2 - x1)) - ((x1 - point.x) * (y2 - y1))) / L2;
    return Math.abs(s) * Math.sqrt(L2);
}

export { GetShortestDistance };
