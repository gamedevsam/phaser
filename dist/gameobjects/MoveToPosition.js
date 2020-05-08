import '../time/NOOP.js';
import { AddTimer } from '../time/AddTimer.js';
import { AngleBetween } from '../math/angle/AngleBetween.js';
import { DistanceBetween } from '../math/distance/DistanceBetween.js';

function MoveToPosition(x, y, duration, ...child) {
    child.forEach(entity => {
        const px = entity.x;
        const py = entity.y;
        const azimuth = AngleBetween(px, py, x, y);
        const speed = DistanceBetween(px, py, x, y) / (duration / 1000);
        const incX = Math.cos(azimuth) * speed;
        const incY = Math.sin(azimuth) * speed;
        const moveHandler = (delta) => {
            delta /= 1000;
            entity.x += incX * delta;
            entity.y += incY * delta;
        };
        const world = entity.world;
        if (world) {
            AddTimer(world, {
                duration,
                onUpdate: moveHandler
            });
        }
    });
}

export { MoveToPosition };
