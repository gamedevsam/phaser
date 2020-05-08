import { Texture } from './Texture';
export declare class TextureManager {
    textures: Map<string, Texture>;
    constructor();
    private createDefaultTextures;
    get(key: string): Texture;
    has(key: string): boolean;
    add(key: string, source: Texture | HTMLImageElement): Texture;
}
//# sourceMappingURL=TextureManager.d.ts.map