function CheckMatrix(matrix) {
    if (!Array.isArray(matrix) || matrix.length < 2 || !Array.isArray(matrix[0])) {
        return false;
    }
    const size = matrix[0].length;
    for (let i = 1; i < matrix.length; i++) {
        if (matrix[i].length !== size) {
            return false;
        }
    }
    return true;
}

export { CheckMatrix };
