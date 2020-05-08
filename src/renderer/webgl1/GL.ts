let gl: WebGLRenderingContext;

export const GL =
{
    get: (): WebGLRenderingContext =>
    {
        return gl;
    },

    set: (context: WebGLRenderingContext | undefined): void =>
    {
        gl = context;
    }
};
