function Wrap(value, min, max) {
    const range = max - min;
    return (min + ((((value - min) % range) + range) % range));
}

export { Wrap };
