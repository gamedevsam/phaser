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

class Circle {
    constructor(x = 0, y = 0, radius = 0) {
        this.set(x, y, radius);
    }
    set(x = 0, y = 0, radius = 0) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        return this;
    }
    contains(x, y) {
        return Contains(this, x, y);
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = value;
        this._diameter = value * 2;
    }
    get diameter() {
        return this._diameter;
    }
    set diameter(value) {
        this._diameter = value;
        this._radius = value * 0.5;
    }
    get left() {
        return this.x - this._radius;
    }
    set left(value) {
        this.x = value + this._radius;
    }
    get right() {
        return this.x + this._radius;
    }
    set right(value) {
        this.x = value - this._radius;
    }
    get top() {
        return this.y - this._radius;
    }
    set top(value) {
        this.y = value + this._radius;
    }
    get bottom() {
        return this.y + this._radius;
    }
    set bottom(value) {
        this.y = value - this._radius;
    }
}

function CircumCircle(triangle, out = new Circle()) {
    const { x1, y1, x2, y2, x3, y3 } = triangle;
    const A = x2 - x1;
    const B = y2 - y1;
    const C = x3 - x1;
    const D = y3 - y1;
    const E = A * (x1 + x2) + B * (y1 + y2);
    const F = C * (x1 + x3) + D * (y1 + y3);
    const G = 2 * (A * (y3 - y2) - B * (x3 - x2));
    if (Math.abs(G) < 0.000001) {
        const minX = Math.min(x1, x2, x3);
        const minY = Math.min(y1, y2, y3);
        const dx = (Math.max(x1, x2, x3) - minX) * 0.5;
        const dy = (Math.max(y1, y2, y3) - minY) * 0.5;
        return out.set(minX + dx, minY + dy, Math.sqrt(dx * dx + dy * dy));
    }
    else {
        const cx = (D * E - B * F) / G;
        const cy = (A * F - C * E) / G;
        const dx = cx - x1;
        const dy = cy - y1;
        return out.set(cx, cy, Math.sqrt(dx * dx + dy * dy));
    }
}

export { CircumCircle };
