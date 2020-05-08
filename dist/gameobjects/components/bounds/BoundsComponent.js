import '../../../geom/rectangle/Contains.js';
import { Rectangle } from '../../../geom/rectangle/Rectangle.js';

class BoundsComponent {
    constructor(parent) {
        this.fixed = false;
        this.parent = parent;
        this.area = new Rectangle();
    }
    setArea(x, y, width, height) {
        this.area.set(x, y, width, height);
    }
    destroy() {
        this.parent = null;
        this.area = null;
    }
}

export { BoundsComponent };
