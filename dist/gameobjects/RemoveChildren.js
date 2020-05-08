import './GetChildIndex.js';
import { RemoveChild } from './RemoveChild.js';

function RemoveChildren(parent, ...children) {
    children.forEach(child => {
        RemoveChild(parent, child);
    });
}

export { RemoveChildren };
