import { GameInstance } from '../GameInstance.js';
import { Matrix2D } from '../math/matrix2d/Matrix2D.js';
import '../geom/rectangle/Contains.js';
import { Rectangle } from '../geom/rectangle/Rectangle.js';

class StaticCamera {
    constructor() {
        this.type = 'StaticCamera';
        this.dirtyRender = true;
        const game = GameInstance.get();
        this.renderer = game.renderer;
        this.matrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        this.bounds = new Rectangle();
        this.worldTransform = new Matrix2D();
        this.reset();
    }
    reset() {
        const width = this.renderer.width;
        const height = this.renderer.height;
        this.width = width;
        this.height = height;
        this.bounds.set(0, 0, width, height);
    }
    destroy() {
        this.world = null;
        this.renderer = null;
        this.matrix = null;
        this.bounds = null;
    }
}

export { StaticCamera };
