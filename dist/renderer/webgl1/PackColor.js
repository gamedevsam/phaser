function PackColor(rgb, alpha) {
    const ua = ((alpha * 255) | 0) & 0xFF;
    return ((ua << 24) | rgb) >>> 0;
}

export { PackColor };
