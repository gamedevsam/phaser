function RotateAroundXY(line, x, y, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    let tx = line.x1 - x;
    let ty = line.y1 - y;
    line.x1 = tx * c - ty * s + x;
    line.y1 = tx * s + ty * c + y;
    tx = line.x2 - x;
    ty = line.y2 - y;
    line.x2 = tx * c - ty * s + x;
    line.y2 = tx * s + ty * c + y;
    return line;
}

export { RotateAroundXY };
