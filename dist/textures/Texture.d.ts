import { Frame } from './Frame';
export declare class Texture {
    key: string;
    width: number;
    height: number;
    image: TexImageSource;
    glTexture: WebGLTexture;
    glIndex: number;
    glIndexCounter: number;
    glFramebuffer: WebGLFramebuffer;
    firstFrame: Frame;
    frames: Map<string | number, Frame>;
    data: unknown;
    constructor(image?: TexImageSource, width?: number, height?: number);
    add(key: string | number, x: number, y: number, width: number, height: number): Frame;
    get(key?: string | number | Frame): Frame;
    getFrames(frames: string[] | number[]): Frame[];
    getFramesInRange(prefix: string, start: number, end: number, zeroPad?: number, suffix?: string): Frame[];
    setSize(width: number, height: number): void;
    setFilter(linear: boolean): void;
    createGL(): void;
    updateGL(): void;
    destroy(): void;
}
//# sourceMappingURL=Texture.d.ts.map