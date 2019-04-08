namespace QuickEngine {
	export class TextResource extends Resource {

		private _data: string;

		constructor(name: string) {
			super(name);
		}

		public clone(): HashObject {
			let obj = new TextResource(this._name);
			obj._data = this._data;
			return obj;
		}

		protected loadImpl(data?: ArrayBuffer | Blob | string) {
			this._data = data as string;
		}

		protected unloadImpl() {
			this._data = null;
		}
	}
}