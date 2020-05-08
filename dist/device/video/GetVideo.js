import './CanPlayVideoType.js';
import { CanPlayH264Video } from './CanPlayH264Video.js';
import { CanPlayHLSVideo } from './CanPlayHLSVideo.js';
import { CanPlayOGGVideo } from './CanPlayOGGVideo.js';
import { CanPlayVP9Video } from './CanPlayVP9Video.js';
import { CanPlayWebMVideo } from './CanPlayWebMVideo.js';

function GetVideo() {
    return {
        h264Video: CanPlayH264Video(),
        hlsVideo: CanPlayHLSVideo(),
        oggVideo: CanPlayOGGVideo(),
        vp9Video: CanPlayVP9Video(),
        webmVideo: CanPlayWebMVideo()
    };
}

export { GetVideo };
