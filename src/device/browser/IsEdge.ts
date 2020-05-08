export function IsEdge (): { edge: boolean }
{
    const edge = (/Edge\/\d+/).test(navigator.userAgent);

    return {
        edge
    };
}
