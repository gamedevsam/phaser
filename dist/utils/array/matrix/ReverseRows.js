function ReverseRows(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        matrix[i].reverse();
    }
    return matrix;
}

export { ReverseRows };
