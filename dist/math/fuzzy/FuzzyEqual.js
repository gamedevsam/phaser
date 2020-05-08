function FuzzyEqual(a, b, epsilon = 0.0001) {
    return Math.abs(a - b) < epsilon;
}

export { FuzzyEqual };
