namespace QE {
    export interface IDestroyable {
        isDestroyed(): boolean;
        destroy(): void;
    }
}
