export function IsWebApp (): boolean
{
    return (navigator.hasOwnProperty('standalone'));
}
