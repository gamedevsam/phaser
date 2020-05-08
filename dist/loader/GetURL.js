function GetURL(key, url, extension, loader) {
    if (!url) {
        url = key + extension;
    }
    if ((/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/).exec(url)) {
        return url;
    }
    else if (loader) {
        return loader.baseURL + loader.path + url;
    }
    else {
        return url;
    }
}

export { GetURL };
