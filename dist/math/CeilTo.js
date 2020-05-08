function CeilTo(value, place = 0, base = 10) {
    const p = Math.pow(base, -place);
    return Math.ceil(value * p) / p;
}

export { CeilTo };
