function SetType(type, ...child) {
    child.forEach(entity => {
        entity.type = type;
    });
}

export { SetType };
