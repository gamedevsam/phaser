import { IBaseCamera } from './IBaseCamera';
import { Vec2Callback } from '../math/vec2';

export interface ICamera extends IBaseCamera
{
    position: Vec2Callback;
    scale: Vec2Callback;
    rotation: number;
}
