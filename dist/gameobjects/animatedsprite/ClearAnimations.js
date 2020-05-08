function ClearAnimations(...sprite) {
    sprite.forEach(entity => {
        entity.anims.clear();
    });
}

export { ClearAnimations };
