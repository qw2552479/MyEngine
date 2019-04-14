namespace QuickEngine {
    export interface IResLoader<T> {
        load(path: string, onLoaded: (err, data: T) => void, thisObj?: Object): void;
        loadAsync(path: string): Promise<T>;
    }
}