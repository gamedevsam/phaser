import { IsWindowsPhone } from '../os/IsWindowsPhone.js';

function IsSafari() {
    const ua = navigator.userAgent;
    const safari = (ua.includes('Safari') && !IsWindowsPhone());
    const safariVersion = ((/Version\/(\d+)\./).test(ua)) ? parseInt(RegExp.$1, 10) : 0;
    return {
        safari,
        safariVersion
    };
}

export { IsSafari };
