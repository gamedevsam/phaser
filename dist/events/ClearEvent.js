function ClearEvent(emitter, event) {
    emitter.events.delete(event);
    return emitter;
}

export { ClearEvent };
