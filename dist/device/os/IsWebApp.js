function IsWebApp() {
    return (navigator.hasOwnProperty('standalone'));
}

export { IsWebApp };
