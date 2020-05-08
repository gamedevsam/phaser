import { ITimerEvent } from './ITimerEvent';
import { IWorld } from '../world/IWorld';
export declare class Clock {
    world: IWorld;
    now: number;
    timeScale: number;
    events: Set<ITimerEvent>;
    constructor(world: IWorld);
    update(delta: number, time: number): void;
}
//# sourceMappingURL=Clock.d.ts.map