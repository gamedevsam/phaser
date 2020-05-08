function MultiplyScalar(target, scale) {
    target.a *= scale;
    target.b *= scale;
    target.c *= scale;
    target.d *= scale;
    target.tx *= scale;
    target.ty *= scale;
    return target;
}

export { MultiplyScalar };
