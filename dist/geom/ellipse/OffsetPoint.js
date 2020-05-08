function OffsetPoint(ellipse, point) {
    ellipse.x += point.x;
    ellipse.y += point.y;
    return ellipse;
}

export { OffsetPoint };
