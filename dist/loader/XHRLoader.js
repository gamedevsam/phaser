function XHRLoader(file) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', file.url, true);
    xhr.responseType = file.responseType;
    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            file.data = xhr.responseText;
            file.hasLoaded = true;
            resolve(file);
        };
        xhr.onerror = () => {
            file.hasLoaded = true;
            reject(file);
        };
        xhr.send();
    });
}

export { XHRLoader };
