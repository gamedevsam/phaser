class InputComponent {
    constructor(parent) {
        this.enabled = false;
        this.enabledChildren = true;
        this.parent = parent;
    }
    destroy() {
        this.parent = null;
        this.hitArea = null;
    }
}

export { InputComponent };
