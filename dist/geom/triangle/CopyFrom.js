function CopyFrom(source, dest) {
    const { x1, y1, x2, y2, x3, y3 } = source;
    return dest.set(x1, y1, x2, y2, x3, y3);
}

export { CopyFrom };
