import { Vec2 } from '../../math/vec2/Vec2.js';

function Centroid(triangle, out = new Vec2()) {
    return out.set((triangle.x1 + triangle.x2 + triangle.x3) / 3, (triangle.y1 + triangle.y2 + triangle.y3) / 3);
}

export { Centroid };
