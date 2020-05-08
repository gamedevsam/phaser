let gl;
const GL = {
    get: () => {
        return gl;
    },
    set: (context) => {
        gl = context;
    }
};

export { GL };
