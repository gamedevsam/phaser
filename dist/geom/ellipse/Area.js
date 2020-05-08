function Area(ellipse) {
    if ((ellipse.width <= 0 || ellipse.height <= 0)) {
        return 0;
    }
    return (ellipse.getMajorRadius() * ellipse.getMinorRadius() * Math.PI);
}

export { Area };
