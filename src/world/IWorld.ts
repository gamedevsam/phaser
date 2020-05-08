import { IBaseWorld } from './IBaseWorld';
import { ICamera } from '../camera/ICamera';

export interface IWorld extends IBaseWorld
{
    camera: ICamera;
}
