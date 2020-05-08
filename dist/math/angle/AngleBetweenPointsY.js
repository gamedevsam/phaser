function AngleBetweenPointsY(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

export { AngleBetweenPointsY };
