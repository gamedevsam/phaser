import { Frame } from '../../textures/Frame';
import { IAnimationData } from './IAnimationData';
import { ISprite } from '../sprite/ISprite';

export interface IAnimatedSprite extends ISprite
{
    anims: Map<string, Frame[]>;
    animData: IAnimationData;
    nextFrame (): void;
    prevFrame (): void;
    isPlaying: boolean;
    isPlayingForward: boolean;
    currentAnimation: string;
}
