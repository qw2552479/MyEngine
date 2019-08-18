namespace QE {

    export interface IStringDictionary<TValue> {
        [key: string]: TValue;
    }

    export interface INumberDictionary<TValue> {
        [key: string]: TValue;
    }

    export class Dictionary<TValue> {

        private data: { [key: string]: TValue } = {};
        private list: Array<TValue> = new Array<TValue>();

        constructor(useOrderList: boolean = false) {
            if (useOrderList) {
                this.list = new Array<TValue>();
            }
        }

        public containsKey(key: string): boolean {
            if (this.data[key]) {
                return true;
            }
            return false;
        }

        public getValue(key: string): TValue {
            return this.data[key];
        }

        public getKeys(): string[] {
            return Object.keys(this.data);
        }

        public getValues(): Array<TValue> {
            return this.list;
        }

        public add(key: string, value: TValue) {
            this.data[key] = value;
            if (this.list) {
                this.list.push(value);
            }
        }

        public remove(key: string) {
            if (this.list) {
                const index: number = this.list.indexOf(this.data[key]);
                if (index !== -1) {
                    this.list.splice(index);
                }
            }
            delete this.data[key];
        }

        public dispose() {
            delete this.data;
            delete this.list;
        }
    }
}
