const caches = new Map();

export const Cache = {

    get: (type: string): Map<string, unknown> =>
    {
        if (!caches.has(type))
        {
            caches.set(type, new Map());
        }

        return caches.get(type);
    }

};
