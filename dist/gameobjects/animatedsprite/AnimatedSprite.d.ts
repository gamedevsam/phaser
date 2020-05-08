import { Frame } from '../../textures/Frame';
import { IAnimationData } from './IAnimationData';
import { IContainer } from '../container/IContainer';
import { Sprite } from '../sprite/Sprite';
export declare class AnimatedSprite extends Sprite {
    anims: Map<string, Frame[]>;
    animData: IAnimationData;
    constructor(x: number, y: number, texture: string, frame?: string | number);
    private stop;
    nextFrame(): void;
    prevFrame(): void;
    update(delta: number, now: number): void;
    get isPlaying(): boolean;
    get isPlayingForward(): boolean;
    get currentAnimation(): string;
    destroy(reparentChildren?: IContainer): void;
}
//# sourceMappingURL=AnimatedSprite.d.ts.map