import { Frame } from '../../textures/Frame';
import { IAnimatedSprite } from './IAnimatedSprite';
export interface IAnimationData {
    currentAnim: string;
    currentFrames: Frame[];
    frameIndex: number;
    animSpeed: number;
    nextFrameTime: number;
    repeatCount: number;
    isPlaying: boolean;
    yoyo: boolean;
    pendingStart: boolean;
    playingForward: boolean;
    delay: number;
    repeatDelay: number;
    onStart?: (sprite: IAnimatedSprite, animation: string) => void;
    onRepeat?: (sprite: IAnimatedSprite, animation: string) => void;
    onComplete?: (sprite: IAnimatedSprite, animation: string) => void;
}
//# sourceMappingURL=IAnimationData.d.ts.map