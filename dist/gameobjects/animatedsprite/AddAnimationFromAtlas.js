function AddAnimationFromAtlas(config, ...sprite) {
    const { key, prefix = '', start = 0, end, zeroPad = 0, suffix = '' } = config;
    sprite.forEach(entity => {
        if (!entity.anims.has(key)) {
            entity.anims.set(key, entity.texture.getFramesInRange(prefix, start, end, zeroPad, suffix));
        }
    });
}

export { AddAnimationFromAtlas };
