namespace QuickEngine {
    export interface IDestroyable {
        isDestroyed(): boolean;
        destroy(): void;
    }
}