const caches = new Map();
const Cache = {
    get: (type) => {
        if (!caches.has(type)) {
            caches.set(type, new Map());
        }
        return caches.get(type);
    }
};

export { Cache };
