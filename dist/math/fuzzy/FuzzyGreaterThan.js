function FuzzyGreaterThan(a, b, epsilon = 0.0001) {
    return a > b - epsilon;
}

export { FuzzyGreaterThan };
