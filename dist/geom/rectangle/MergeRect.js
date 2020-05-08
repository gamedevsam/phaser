function MergeRect(target, source) {
    const minX = Math.min(target.x, source.x);
    const maxX = Math.max(target.right, source.right);
    const minY = Math.min(target.y, source.y);
    const maxY = Math.max(target.bottom, source.bottom);
    return target.set(minX, minY, maxX - minX, maxY - minY);
}

export { MergeRect };
