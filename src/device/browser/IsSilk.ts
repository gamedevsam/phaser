export function IsSilk (): { silk: boolean }
{
    const silk = navigator.userAgent.includes('Silk');

    return {
        silk
    };
}
