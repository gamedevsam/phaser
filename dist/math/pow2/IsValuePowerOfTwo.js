function IsValuePowerOfTwo(value) {
    return (value > 0 && (value & (value - 1)) === 0);
}

export { IsValuePowerOfTwo };
