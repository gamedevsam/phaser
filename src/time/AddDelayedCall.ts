import { AddTimer } from './AddTimer';
import { IBaseWorld } from '../world/IBaseWorld';

export function AddDelayedCall (world: IBaseWorld, delay: number, callback: () => void): void
{
    AddTimer(world,
        {
            duration: 0,
            delay,
            onComplete: callback
        }
    );
}
