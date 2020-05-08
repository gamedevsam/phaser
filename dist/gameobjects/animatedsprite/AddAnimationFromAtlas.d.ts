import { IAnimatedSprite } from './IAnimatedSprite';
export declare type AtlasFrameConfig = {
    key: string;
    prefix?: string;
    start?: number;
    end: number;
    zeroPad?: number;
    suffix?: string;
};
export declare function AddAnimationFromAtlas(config: AtlasFrameConfig, ...sprite: IAnimatedSprite[]): void;
//# sourceMappingURL=AddAnimationFromAtlas.d.ts.map