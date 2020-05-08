function SetPosition(x, y, ...child) {
    child.forEach(entity => {
        entity.transform.setPosition(x, y);
    });
}

export { SetPosition };
