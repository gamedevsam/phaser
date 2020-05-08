import { EventEmitter } from '../events';
import { File } from './File';
export declare class Loader extends EventEmitter {
    baseURL: string;
    path: string;
    crossOrigin: string;
    maxParallelDownloads: number;
    isLoading: boolean;
    progress: number;
    queue: Set<File>;
    inflight: Set<File>;
    completed: Set<File>;
    onComplete: Function;
    constructor();
    reset(): void;
    add(...file: File[]): this;
    start(onComplete: Function): this;
    nextFile(): void;
    stop(): void;
    private updateProgress;
    private fileComplete;
    private fileError;
    totalFilesToLoad(): number;
    setBaseURL(url?: string): this;
    setPath(path?: string): this;
    setCORS(crossOrigin: string): this;
    setMaxParallelDownloads(max: number): this;
}
//# sourceMappingURL=Loader.d.ts.map