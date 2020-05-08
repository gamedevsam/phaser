function IsOpera() {
    const opera = navigator.userAgent.includes('Opera');
    return {
        opera
    };
}

export { IsOpera };
