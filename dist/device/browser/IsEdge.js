function IsEdge() {
    const edge = (/Edge\/\d+/).test(navigator.userAgent);
    return {
        edge
    };
}

export { IsEdge };
