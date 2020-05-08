function SetScale(scaleX, scaleY, ...child) {
    child.forEach(entity => {
        entity.transform.setScale(scaleX, scaleY);
    });
}

export { SetScale };
