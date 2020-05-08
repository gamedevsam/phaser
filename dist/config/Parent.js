import { GetElement } from '../dom/GetElement.js';

let parent;
function Parent(parentElement) {
    return () => {
        if (parentElement) {
            parent = GetElement(parentElement);
        }
    };
}
function GetParent() {
    return parent;
}

export { GetParent, Parent };
