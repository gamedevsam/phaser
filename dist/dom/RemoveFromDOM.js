function RemoveFromDOM(element) {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

export { RemoveFromDOM };
