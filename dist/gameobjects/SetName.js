function SetName(name, ...child) {
    child.forEach(entity => {
        entity.name = name;
    });
}

export { SetName };
