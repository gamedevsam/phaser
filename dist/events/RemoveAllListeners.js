function RemoveAllListeners(emitter, event) {
    if (!event) {
        emitter.events.clear();
    }
    else {
        emitter.events.delete(event);
    }
}

export { RemoveAllListeners };
