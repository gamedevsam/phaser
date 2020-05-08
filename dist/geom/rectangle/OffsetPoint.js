function OffsetPoint(rect, point) {
    rect.x += point.x;
    rect.y += point.y;
    return rect;
}

export { OffsetPoint };
