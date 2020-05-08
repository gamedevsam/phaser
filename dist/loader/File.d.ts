import { Loader } from './Loader';
export declare class File {
    key: string;
    url: string;
    responseType: XMLHttpRequestResponseType;
    crossOrigin: string | undefined;
    data: any;
    error: ErrorEvent | undefined;
    config: unknown;
    skipCache: boolean;
    hasLoaded: boolean;
    loader: Loader;
    load: () => Promise<File>;
    constructor(key: string, url: string, config?: unknown);
}
//# sourceMappingURL=File.d.ts.map