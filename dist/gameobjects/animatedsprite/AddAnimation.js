function AddAnimation(key, frames, ...sprite) {
    sprite.forEach(entity => {
        if (!entity.anims.has(key)) {
            entity.anims.set(key, entity.texture.getFrames(frames));
        }
    });
}

export { AddAnimation };
