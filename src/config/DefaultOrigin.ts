export let originX = 0.5;
export let originY = 0.5;

export function DefaultOrigin (x: number = 0.5, y: number = x): () => void
{
    return (): void =>
    {
        originX = x;
        originY = y;
    };
}
