function Rotate(target, angle) {
    const { a, b, c, d, tx, ty } = target;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    return target.set((a * cos) + (c * sin), (b * cos) + (d * sin), (a * -sin) + (c * cos), (b * -sin) + (d * cos), tx, ty);
}

export { Rotate };
