interface IGetIOSResult
{
    iOS: boolean;
    iOSVersion: number;
    iPhone: boolean;
    iPad: boolean;
}

export function IsiOS (): IGetIOSResult
{
    const ua: string = navigator.userAgent;

    const result: IGetIOSResult = {
        iOS: false,
        iOSVersion: 0,
        iPhone: false,
        iPad: false
    };

    if ((/iP[ao]d|iPhone/i).test(ua))
    {
        const match = (/OS (\d+)/).exec(navigator.appVersion);

        result.iOS = true;
        result.iOSVersion = parseInt(match[0], 10);
        result.iPhone = (ua.toLowerCase().includes('iphone'));
        result.iPad = (ua.toLowerCase().includes('ipad'));
    }

    return result;
}
