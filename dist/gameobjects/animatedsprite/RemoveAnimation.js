function RemoveAnimation(key, ...sprite) {
    sprite.forEach(entity => {
        entity.anims.delete(key);
    });
}

export { RemoveAnimation };
