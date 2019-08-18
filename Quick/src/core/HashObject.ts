namespace QE {

    /**
     * @private
     * 哈希计数
     */
    let _hashCount = 1;
    let _instanceId = 1;

    export enum HideFlags {
        None = 0,
        HideInHierarchy = 1,
        HideInInspector = 2,
        DontSaveInEditor = 4,
        NotEditable = 8,
        DontSaveInBuild = 16,
        DontUnloadUnusedAsset = 32,
        DontSave = 52,
        HideAndDontSave = 61
    }

    export class HashObject implements IDestroyable {

        public get hashCode(): number {
            return this._hashCode;
        }

        public get instanceId(): number {
            return this._instanceId;
        }

        public constructor() {
            this._hashCode = _hashCount++;
            this._instanceId = _instanceId++;
        }

        private readonly _hashCode: number;
        private readonly _instanceId: number;
        protected _isDestroyed = false;

        public static destroy(object: HashObject) {
            object.destroy();
        }

        public static clone<T extends HashObject>(original: T): T {
            return original.clone() as T;
        }

        public isDestroyed(): boolean {
            return this._isDestroyed;
        }

        public destroy() {
            if (this._isDestroyed) {
                console.warn('重复调用destroy!');
                return;
            }
            this.onDestroy();
            this._isDestroyed = true;
        }

        protected onDestroy() {

        }

        public copy(object: HashObject): void {

        }

        public clone(): HashObject {
            const newObj = new HashObject();
            newObj.copy(this);
            return newObj;
        }
    }

}
