function Determinant(src) {
    const { a, b, c, d } = src;
    return (a * d) - (b * c);
}

export { Determinant };
