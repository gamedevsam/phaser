let maxTextures = 0;

function MaxTextures (max: number = 0): () => void
{
    return (): void =>
    {
        maxTextures = max;
    };
}

function SetMaxTextures (max: number): void
{
    maxTextures = max;
}

function GetMaxTextures (): number
{
    return maxTextures;
}

export {
    MaxTextures,
    GetMaxTextures,
    SetMaxTextures
};
