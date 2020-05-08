function CountMatchingChildren(parent, property, value) {
    const children = parent.children;
    let total = 0;
    children.forEach(child => {
        const descriptor = Object.getOwnPropertyDescriptor(child, property);
        if (descriptor && (value === undefined || value === descriptor.value)) {
            total++;
        }
    });
    return total;
}

export { CountMatchingChildren };
