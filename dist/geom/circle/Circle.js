import { Contains } from './Contains.js';

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

export { Circle };
