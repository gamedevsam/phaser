import { Container } from '../container/Container';
import { Frame } from '../../textures/Frame';
import { IGameObject } from '../IGameObject';
import { Texture } from '../../textures/Texture';
export declare class Sprite extends Container {
    texture: Texture;
    frame: Frame;
    hasTexture: boolean;
    vertexData: Float32Array;
    vertexColor: Uint32Array;
    vertexAlpha: Float32Array;
    vertexTint: Uint32Array;
    prevTextureID: number;
    private _tint;
    constructor(x: number, y: number, texture: string | Texture, frame?: string | number);
    setTexture(key: string | Texture, frame?: string | number): this;
    setFrame(key?: string | number | Frame): this;
    isRenderable(): boolean;
    updateVertices(): void;
    get tint(): number;
    set tint(value: number);
    destroy(reparentChildren?: IGameObject): void;
}
//# sourceMappingURL=Sprite.d.ts.map