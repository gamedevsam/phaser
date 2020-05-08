function FuzzyCeil(value, epsilon = 0.0001) {
    return Math.ceil(value - epsilon);
}

export { FuzzyCeil };
