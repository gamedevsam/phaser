function GetElement(target) {
    let element;
    if (target) {
        if (typeof target === 'string') {
            element = document.getElementById(target);
        }
        else if (typeof target === 'object' && target.nodeType === 1) {
            element = target;
        }
    }
    if (!element) {
        element = document.body;
    }
    return element;
}

export { GetElement };
