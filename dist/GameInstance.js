let instance;
let frame = 0;
const GameInstance = {
    get: () => {
        return instance;
    },
    set: (game) => {
        instance = game;
    },
    getFrame: () => {
        return frame;
    },
    setFrame: (current) => {
        frame = current;
    }
};

export { GameInstance };
