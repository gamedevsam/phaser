function ShortestAngleBetween(angle1, angle2) {
    const difference = angle2 - angle1;
    if (difference === 0) {
        return 0;
    }
    const times = Math.floor((difference - (-180)) / 360);
    return difference - (times * 360);
}

export { ShortestAngleBetween };
