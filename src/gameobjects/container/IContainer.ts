import { IGameObject } from '../IGameObject';

export interface IContainer extends IGameObject
{
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    skewX: number;
    skewY: number;
    originX: number;
    originY: number;
    alpha: number;
    // setAlpha (value?: number): this;
    setSize (width: number, height: number): this;
    setPosition (x: number, y: number): this;
    setOrigin (x: number, y: number): this;
    setSkew (x: number, y: number): this;
    setScale (x: number, y: number): this;
    setRotation (value: number): this;
}
