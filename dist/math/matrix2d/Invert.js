function Invert(target) {
    const { a, b, c, d, tx, ty } = target;
    let determinant = a * d - b * c;
    if (determinant) {
        determinant = 1 / determinant;
        target.set(d * determinant, -b * determinant, -c * determinant, a * determinant, (c * ty - d * tx) * determinant, (b * tx - a * ty) * determinant);
    }
    return target;
}

export { Invert };
