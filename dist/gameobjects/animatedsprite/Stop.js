function Stop(...sprite) {
    sprite.forEach(entity => {
        const data = entity.animData;
        data.isPlaying = false;
        data.currentAnim = '';
        if (data.onComplete) {
            data.onComplete(entity, data.currentAnim);
        }
    });
}

export { Stop };
