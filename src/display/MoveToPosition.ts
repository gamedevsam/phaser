import { AddTimer } from '../time/AddTimer';
import { AngleBetween } from '../math/angle';
import { DistanceBetween } from '../math/distance';
import { IContainer } from '../gameobjects/container/IContainer';

export function MoveToPosition <T extends IContainer> (x: number, y: number, duration: number, ...children: T[]): T[]
{
    children.forEach(child =>
    {
        const px = child.x;
        const py = child.y;

        const azimuth = AngleBetween(px, py, x, y);
        const speed = DistanceBetween(px, py, x, y) / (duration / 1000);

        const incX = Math.cos(azimuth) * speed;
        const incY = Math.sin(azimuth) * speed;

        const moveHandler = (delta: number): void =>
        {
            delta /= 1000;

            child.x += incX * delta;
            child.y += incY * delta;
        };

        const world = child.world;

        if (world)
        {
            AddTimer(world, {
                duration,
                onUpdate: moveHandler
            });
        }
    });

    return children;
}
