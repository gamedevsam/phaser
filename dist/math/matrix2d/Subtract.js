function Subtract(target, src) {
    const { a, b, c, d, tx, ty } = src;
    target.a -= a;
    target.b -= b;
    target.c -= c;
    target.d -= d;
    target.tx -= tx;
    target.ty -= ty;
    return target;
}

export { Subtract };
