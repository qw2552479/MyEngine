namespace QuickEngine {
	export class TextResource extends Resource {
		private _data: string;
		public get data(): string {
			return this._data;
		}

		constructor(name: string) {
			super(name);
		}

		public clone(): HashObject {
			let obj = new TextResource(this._name);
			obj._data = this._data;
			return obj;
		}

		protected loadImpl() {
			TextLoader.instance.load(this.name, (err, data) => {
				if (err || !data) {
					console.error('load text failed: ' + this.name + ' error: ' + err);

					this._state = ResState.Loaded;
					this._data = '';

					this._onLoad();
					return;
				}

				this._data = data;
				this._state = ResState.Loaded;

				this._onLoad();
			}, this);
		}

		protected unloadImpl() {
			this._data = null;
		}
	}
}