function NumberArray(start, end, prefix, suffix) {
    const result = [];
    for (let i = start; i <= end; i++) {
        if (prefix || suffix) {
            let key = (prefix) ? prefix + i.toString() : i.toString();
            if (suffix) {
                key = key.concat(suffix);
            }
            result.push(key);
        }
        else {
            result.push(i);
        }
    }
    return result;
}

export { NumberArray };
