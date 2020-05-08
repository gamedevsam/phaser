import { IsiOS } from './IsiOS.js';
import { IsWindowsPhone } from './IsWindowsPhone.js';
import { IsAndroid } from './IsAndroid.js';
import { IsChromeOS } from './IsChromeOS.js';
import { IsCordova } from './IsCordova.js';
import { IsCrosswalk } from './IsCrosswalk.js';
import { IsEjecta } from './IsEjecta.js';
import { IsKindle } from './IsKindle.js';
import { IsLinux } from './IsLinux.js';
import { IsMacOS } from './IsMacOS.js';
import { IsNode } from './IsNode.js';
import { IsNodeWebkit } from './IsNodeWebkit.js';
import { IsWebApp } from './IsWebApp.js';
import { IsWindows } from './IsWindows.js';

function GetOS() {
    const ua = navigator.userAgent;
    const { iOS, iOSVersion, iPad, iPhone } = IsiOS();
    const result = {
        android: IsAndroid(),
        chromeOS: IsChromeOS(),
        cordova: IsCordova(),
        crosswalk: IsCrosswalk(),
        desktop: false,
        ejecta: IsEjecta(),
        iOS,
        iOSVersion,
        iPad,
        iPhone,
        kindle: IsKindle(),
        linux: IsLinux(),
        macOS: IsMacOS(),
        node: IsNode(),
        nodeWebkit: IsNodeWebkit(),
        pixelRatio: 1,
        webApp: IsWebApp(),
        windows: IsWindows(),
        windowsPhone: IsWindowsPhone()
    };
    if (result.windowsPhone) {
        result.android = false;
        result.iOS = false;
        result.macOS = false;
        result.windows = true;
    }
    const silk = ua.includes('Silk');
    if (result.windows || result.macOS || (result.linux && !silk) || result.chromeOS) {
        result.desktop = true;
    }
    if (result.windowsPhone || (((/Windows NT/i).test(ua)) && ((/Touch/i).test(ua)))) {
        result.desktop = false;
    }
    return result;
}

export { GetOS };
