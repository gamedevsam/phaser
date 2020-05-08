function RoundTo(value, place = 0, base = 10) {
    const p = Math.pow(base, -place);
    return Math.round(value * p) / p;
}

export { RoundTo };
