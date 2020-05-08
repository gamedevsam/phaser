import { IsiOS } from '../os/IsiOS.js';

function IsMobileSafari() {
    const { iOS } = IsiOS();
    const mobileSafari = (navigator.userAgent.includes('AppleWebKit') && iOS);
    return {
        mobileSafari
    };
}

export { IsMobileSafari };
