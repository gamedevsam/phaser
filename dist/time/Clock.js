class Clock {
    constructor(world) {
        this.world = world;
        this.timeScale = 1;
        this.events = new Set();
    }
    update(delta, time) {
        this.now = time;
        delta *= this.timeScale;
        this.events.forEach(timer => {
            if (timer.update(delta)) {
                this.events.delete(timer);
            }
        });
    }
}

export { Clock };
