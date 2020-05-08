function DistanceBetweenPointsSquared(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy;
}

export { DistanceBetweenPointsSquared };
