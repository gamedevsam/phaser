export function IsWindowsPhone (): boolean
{
    const ua: string = navigator.userAgent;

    return ((/Windows Phone/i).test(ua) || (/IEMobile/i).test(ua));
}
