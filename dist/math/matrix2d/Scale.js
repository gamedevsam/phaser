function Scale(target, scaleX, scaleY) {
    target.a *= scaleX;
    target.b *= scaleX;
    target.c *= scaleY;
    target.d *= scaleY;
    return target;
}

export { Scale };
