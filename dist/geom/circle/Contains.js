function Contains(circle, x, y) {
    if (circle.radius > 0 && x >= circle.left && x <= circle.right && y >= circle.top && y <= circle.bottom) {
        const dx = (circle.x - x) * (circle.x - x);
        const dy = (circle.y - y) * (circle.y - y);
        return (dx + dy) <= (circle.radius * circle.radius);
    }
    else {
        return false;
    }
}

export { Contains };
