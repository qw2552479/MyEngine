namespace QE {
    export interface LoadResResult<T> {
        error?: string;
        res?: T;
    }

    export interface IResLoader<T> {
        load(path: string, onEnd?: (error?: string, data?: T) => void, onProgress?: (progress: null) => void): T;
    }
}
