function Circumference(ellipse) {
    const rx = ellipse.width / 2;
    const ry = ellipse.height / 2;
    const h = Math.pow((rx - ry), 2) / Math.pow((rx + ry), 2);
    return (Math.PI * (rx + ry)) * (1 + ((3 * h) / (10 + Math.sqrt(4 - (3 * h)))));
}

export { Circumference };
