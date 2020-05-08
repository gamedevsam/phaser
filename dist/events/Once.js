import './EventInstance.js';
import { On } from './On.js';

function Once(emitter, event, callback, context = emitter) {
    return On(emitter, event, callback, context, true);
}

export { Once };
