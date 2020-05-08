import { IsChrome } from './IsChrome.js';
import { IsEdge } from './IsEdge.js';
import { IsFirefox } from './IsFirefox.js';
import { IsMSIE } from './IsMSIE.js';
import '../os/IsiOS.js';
import { IsMobileSafari } from './IsMobileSafari.js';
import { IsOpera } from './IsOpera.js';
import '../os/IsWindowsPhone.js';
import { IsSafari } from './IsSafari.js';
import { IsSilk } from './IsSilk.js';
import { IsTrident } from './IsTrident.js';

function GetBrowser() {
    const { chrome, chromeVersion } = IsChrome();
    const { edge } = IsEdge();
    const { firefox, firefoxVersion } = IsFirefox();
    let { ie, ieVersion } = IsMSIE();
    const { mobileSafari } = IsMobileSafari();
    const { opera } = IsOpera();
    const { safari, safariVersion } = IsSafari();
    const { silk } = IsSilk();
    const { trident, tridentVersion, tridentIEVersion } = IsTrident();
    if (trident) {
        ie = true;
        ieVersion = tridentIEVersion;
    }
    const result = {
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

export { GetBrowser };
