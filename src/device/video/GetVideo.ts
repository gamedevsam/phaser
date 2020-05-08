import { CanPlayH264Video } from './CanPlayH264Video';
import { CanPlayHLSVideo } from './CanPlayHLSVideo';
import { CanPlayOGGVideo } from './CanPlayOGGVideo';
import { CanPlayVP9Video } from './CanPlayVP9Video';
import { CanPlayWebMVideo } from './CanPlayWebMVideo';
import { IDeviceVideoResult } from './IDeviceVideoResult';

export function GetVideo (): IDeviceVideoResult
{
    return {
        h264Video: CanPlayH264Video(),
        hlsVideo: CanPlayHLSVideo(),
        oggVideo: CanPlayOGGVideo(),
        vp9Video: CanPlayVP9Video(),
        webmVideo: CanPlayWebMVideo()
    };
}
