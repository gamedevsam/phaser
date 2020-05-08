let instance;
const TextureManagerInstance = {
    get: () => {
        return instance;
    },
    set: (manager) => {
        instance = manager;
    }
};

export { TextureManagerInstance };
