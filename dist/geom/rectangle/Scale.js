function Scale(rect, x, y = x) {
    rect.width *= x;
    rect.height *= y;
    return rect;
}

export { Scale };
