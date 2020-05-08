class Vec2 {
    constructor(x = 0, y = 0) {
        this.set(x, y);
    }
    set(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        return this;
    }
    getArray() {
        return [this.x, this.y];
    }
    fromArray(src) {
        return this.set(src[0], src[1]);
    }
}

export { Vec2 };
