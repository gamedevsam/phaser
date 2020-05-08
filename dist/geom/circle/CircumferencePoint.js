import { Vec2 } from '../../math/vec2/Vec2.js';

function CircumferencePoint(circle, angle, out = new Vec2()) {
    return out.set(circle.x + (circle.radius * Math.cos(angle)), circle.y + (circle.radius * Math.sin(angle)));
}

export { CircumferencePoint };
