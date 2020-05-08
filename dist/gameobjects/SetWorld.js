function SetWorld(world, ...child) {
    child.forEach(entity => {
        entity.world = world;
    });
}

export { SetWorld };
