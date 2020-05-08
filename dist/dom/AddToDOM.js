import { GetElement } from './GetElement.js';

function AddToDOM(element, parent) {
    const target = GetElement(parent);
    target.appendChild(element);
    return element;
}

export { AddToDOM };
