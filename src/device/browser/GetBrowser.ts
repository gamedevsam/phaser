import { IDeviceBrowserResult } from './IDeviceBrowserResult';
import { IsChrome } from './IsChrome';
import { IsEdge } from './IsEdge';
import { IsFirefox } from './IsFirefox';
import { IsMSIE } from './IsMSIE';
import { IsMobileSafari } from './IsMobileSafari';
import { IsOpera } from './IsOpera';
import { IsSafari } from './IsSafari';
import { IsSilk } from './IsSilk';
import { IsTrident } from './IsTrident';

export function GetBrowser (): IDeviceBrowserResult
{
    const { chrome, chromeVersion } = IsChrome();
    const { edge } = IsEdge();
    const { firefox, firefoxVersion } = IsFirefox();
    let { ie, ieVersion } = IsMSIE();
    const { mobileSafari } = IsMobileSafari();
    const { opera } = IsOpera();
    const { safari, safariVersion } = IsSafari();
    const { silk } = IsSilk();
    const { trident, tridentVersion, tridentIEVersion } = IsTrident();

    if (trident)
    {
        ie = true;
        ieVersion = tridentIEVersion;
    }

    const result: IDeviceBrowserResult = {
        chrome,
        chromeVersion,
        edge,
        firefox,
        firefoxVersion,
        ie,
        ieVersion,
        mobileSafari,
        opera,
        safari,
        safariVersion,
        silk,
        trident,
        tridentVersion
    };

    return result;
}
