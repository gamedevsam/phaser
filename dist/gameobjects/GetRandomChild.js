function GetRandomChild(parent, startIndex = 0, length) {
    const children = parent.children;
    if (!length) {
        length = children.length;
    }
    const randomIndex = startIndex + Math.floor(Math.random() * length);
    return children[randomIndex];
}

export { GetRandomChild };
