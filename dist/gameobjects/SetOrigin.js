function SetOrigin(originX, originY, ...child) {
    child.forEach(entity => {
        entity.transform.setOrigin(originX, originY);
    });
}

export { SetOrigin };
