let bgColor = 0;
function BackgroundColor(color = 0) {
    return () => {
        bgColor = color;
    };
}
function GetBackgroundColor() {
    return bgColor;
}

export { BackgroundColor, GetBackgroundColor };
