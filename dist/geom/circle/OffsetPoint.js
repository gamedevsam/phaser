function OffsetPoint(circle, point) {
    circle.x += point.x;
    circle.y += point.y;
    return circle;
}

export { OffsetPoint };
