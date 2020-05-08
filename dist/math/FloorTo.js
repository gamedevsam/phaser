function FloorTo(value, place = 0, base = 10) {
    const p = Math.pow(base, -place);
    return Math.floor(value * p) / p;
}

export { FloorTo };
