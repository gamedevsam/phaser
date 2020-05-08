let instance;
const SceneManagerInstance = {
    get: () => {
        return instance;
    },
    set: (manager) => {
        instance = manager;
    }
};

export { SceneManagerInstance };
