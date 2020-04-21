import { Loader } from './Loader';

export class File<T = string>
{
    key: string;
    url: string;
    responseType: XMLHttpRequestResponseType = 'text';
    crossOrigin: string | undefined = undefined;
    data: T;
    error: string | Event | ErrorEvent | undefined;
    config: object;
    skipCache: boolean = false;
    hasLoaded: boolean = false;
    loader: Loader;
    load: () => Promise<File<T>>;

    constructor (key: string, url: string, config?: object)
    {
        this.key = key;
        this.url = url;
        this.config = config;
    }
}
