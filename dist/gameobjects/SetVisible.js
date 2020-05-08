function SetVisible(visible, ...child) {
    child.forEach(entity => {
        entity.visible = visible;
    });
}

export { SetVisible };
