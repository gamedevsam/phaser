function SetTextBaseline(baseline, ...text) {
    text.forEach(entity => {
        entity.textBaseline = baseline;
        entity.updateText();
    });
}

export { SetTextBaseline };
