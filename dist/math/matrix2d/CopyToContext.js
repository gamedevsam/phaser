function CopyToContext(src, context) {
    const { a, b, c, d, tx, ty } = src;
    context.transform(a, b, c, d, tx, ty);
    return context;
}

export { CopyToContext };
