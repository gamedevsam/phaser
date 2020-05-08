import { IsiOS } from '../os/IsiOS';

export function IsMobileSafari (): { mobileSafari: boolean }
{
    const { iOS } = IsiOS();

    const mobileSafari = (navigator.userAgent.includes('AppleWebKit') && iOS);

    return {
        mobileSafari
    };
}
