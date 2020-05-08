function RenderCanvas(sprite, ctx) {
    const frame = sprite.frame;
    const { a, b, c, d, tx, ty } = sprite.transform.world;
    ctx.save();
    ctx.setTransform(a, b, c, d, tx, ty);
    ctx.globalAlpha = sprite.alpha;
    ctx.drawImage(frame.texture.image, frame.x, frame.y, frame.width, frame.height, 0, 0, frame.width, frame.height);
    ctx.restore();
}

export { RenderCanvas };
