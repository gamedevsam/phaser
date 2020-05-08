class File {
    constructor(key, url, config) {
        this.responseType = 'text';
        this.crossOrigin = undefined;
        this.skipCache = false;
        this.hasLoaded = false;
        this.key = key;
        this.url = url;
        this.config = config;
    }
}

export { File };
