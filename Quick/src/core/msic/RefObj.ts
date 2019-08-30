/**
 *  -
 *
 * create by wjl at
 *
 */

namespace QE {
    export class RefObj extends HashObject {

        private _retainCount = 1;
        public get retainCount(): number {
            return this._retainCount;
        }

        constructor() {
            super();
        }

        public retain() {
            this._retainCount++;
        }

        public release() {

            console.assert(this._retainCount > 0, 'retain count must greater than 0');

            this._retainCount--;
            if (this._retainCount === 0) {
                this.destroy();
            }
        }
    }
}
