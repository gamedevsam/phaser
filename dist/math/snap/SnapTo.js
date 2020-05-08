function SnapTo(value, gap, start = 0, divide = false) {
    if (gap === 0) {
        return value;
    }
    value -= start;
    value = gap * Math.round(value / gap);
    return (divide) ? (start + value) / gap : start + value;
}

export { SnapTo };
