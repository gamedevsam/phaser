function IsSilk() {
    const silk = navigator.userAgent.includes('Silk');
    return {
        silk
    };
}

export { IsSilk };
