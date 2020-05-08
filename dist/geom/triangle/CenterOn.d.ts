import { ITriangle } from './ITriangle';
import { Vec2 } from '../../math/vec2/Vec2';
declare type CenterFunction = (triangle: ITriangle) => Vec2;
export declare function CenterOn(triangle: ITriangle, x: number, y: number, centerFunc?: CenterFunction): ITriangle;
export {};
//# sourceMappingURL=CenterOn.d.ts.map