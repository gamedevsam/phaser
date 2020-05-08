import { IBaseWorld } from '../world/IBaseWorld';
import { ITimerEvent } from './ITimerEvent';

export class Clock
{
    world: IBaseWorld;

    /**
     * The current time of the Clock, in milliseconds.
     *
     * If accessed externally, this is equivalent to the `time` parameter normally passed to a Scene's `update` method.
     */
    now: number;

    /**
     * The scale of the Clock's time delta.
     *
     * The time delta is the time elapsed between two consecutive frames and influences the speed of time for this Clock and anything which uses it, such as its Timer Events. Values higher than 1 increase the speed of time, while values smaller than 1 decrease it. A value of 0 freezes time and is effectively equivalent to pausing the Clock.
     */
    timeScale: number;

    events: Set<ITimerEvent>;

    constructor (world: IBaseWorld)
    {
        this.world = world;

        this.timeScale = 1;

        this.events = new Set();
    }

    update (delta: number, time: number): void
    {
        this.now = time;

        delta *= this.timeScale;

        this.events.forEach(timer =>
        {
            if (timer.update(delta))
            {
                this.events.delete(timer);
            }
        });
    }
}
