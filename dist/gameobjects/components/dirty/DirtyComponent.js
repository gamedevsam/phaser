import { GameInstance } from '../../../GameInstance.js';

class DirtyComponent {
    constructor(parent) {
        this.render = true;
        this.update = true;
        this.frame = 0;
        this.parent = parent;
    }
    setRender() {
        this.render = true;
        this.frame = GameInstance.getFrame();
    }
    setUpdate() {
        this.update = true;
    }
    destroy() {
        this.parent = null;
    }
}

export { DirtyComponent };
