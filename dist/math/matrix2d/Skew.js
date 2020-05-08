function Skew(target, angleX, angleY) {
    target.b += Math.tan(angleX);
    target.c += Math.tan(angleY);
    return target;
}

export { Skew };
