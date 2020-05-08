import { Contains } from './Contains.js';

class Rectangle {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.set(x, y, width, height);
    }
    set(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        return this;
    }
    contains(x, y) {
        return Contains(this, x, y);
    }
    set right(value) {
        if (value <= this.x) {
            this.width = 0;
        }
        else {
            this.width = value - this.x;
        }
    }
    get right() {
        return this.x + this.width;
    }
    set bottom(value) {
        if (value <= this.y) {
            this.height = 0;
        }
        else {
            this.height = value - this.y;
        }
    }
    get bottom() {
        return this.y + this.height;
    }
}

export { Rectangle };
