function CenterOn(rect, x, y) {
    rect.x = x - (rect.width / 2);
    rect.y = y - (rect.height / 2);
    return rect;
}

export { CenterOn };
