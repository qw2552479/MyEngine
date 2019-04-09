namespace QuickEngine {

    /**
     * @private
     * 哈希计数
     */
    let _hashCount: number = 1;
    let _instanceId: number = 1;

    export class HashObject implements IDestroyable {

        private readonly _hashCode: number;
        private readonly _instanceId: number;
        protected _isDestroyed: boolean = false;

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
            let newObj = new HashObject();
            newObj.copy(this);
            return newObj;
        }

        public static destroy(object: HashObject) {
            object.destroy();
        }

        public static clone<T extends HashObject>(original: T): T {
            return original.clone() as T;
        }
    }

}
