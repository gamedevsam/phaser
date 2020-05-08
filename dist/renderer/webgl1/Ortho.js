function Ortho(width, height, near = -1, far = 1) {
    const m00 = -2 * (1 / -width);
    const m11 = -2 * (1 / height);
    const m22 = 2 * (1 / (near - far));
    return new Float32Array([m00, 0, 0, 0, 0, m11, 0, 0, 0, 0, m22, 0, -1, 1, 0, 1]);
}

export { Ortho };
