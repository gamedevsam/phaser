export function RemoveFromDOM (element: HTMLElement): void
{
    if (element.parentNode)
    {
        element.parentNode.removeChild(element);
    }
}
