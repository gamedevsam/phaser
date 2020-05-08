export function IsOpera (): { opera: boolean }
{
    const opera = navigator.userAgent.includes('Opera');

    return {
        opera
    };
}
