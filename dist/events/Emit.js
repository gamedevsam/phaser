function Emit(emitter, event, ...args) {
    if (!emitter.events.has(event)) {
        return false;
    }
    const listeners = emitter.events.get(event);
    for (const ee of listeners) {
        ee.callback.apply(ee.context, args);
        if (ee.once) {
            listeners.delete(ee);
        }
    }
    if (listeners.size === 0) {
        emitter.events.delete(event);
    }
    return true;
}

export { Emit };
