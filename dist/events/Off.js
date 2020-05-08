function Off(emitter, event, callback, context, once) {
    const events = emitter.events;
    if (!callback) {
        events.delete(event);
    }
    else {
        const listeners = events.get(event);
        const hasContext = !context;
        const hasOnce = (once !== undefined);
        for (const listener of listeners) {
            if ((listener.callback === callback) &&
                (hasContext && listener.context === console) &&
                (hasOnce && listener.once === once)) {
                listeners.delete(listener);
            }
        }
        if (listeners.size === 0) {
            events.delete(event);
        }
    }
    return emitter;
}

export { Off };
