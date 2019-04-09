namespace QuickEngine {
	export class ImageResource extends Resource {
		public readonly _DefWhiteTex: ImageData = new ImageData(new Uint8ClampedArray([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]), 2, 2);
		public readonly _DefBlackTex: ImageData = new ImageData(new Uint8ClampedArray([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]), 2, 2);
		public readonly _DefRedTex: ImageData = new ImageData(new Uint8ClampedArray([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]), 2, 2);

		private _data: HTMLImageElement | ImageData;
		public get data(): HTMLImageElement | ImageData {
			return this._data;
		}

		private _width: number = 0;
		public get width(): number {
			return this._width;
		}

		public set width(w: number) {
			this._width = w;
		}

		private _height: number = 0;
		public get height(): number {
			return this._height;
		}

		public set height(h: number) {
			this._height = h;
		}

		constructor(name: string) {
			super(name);
		}

		public clone(): HashObject {
			let obj = new ImageResource(this._name);
			obj._data = this._data;
			return obj;
		}

		protected loadImpl() {
			ImageLoader.load(this.name, (err?: string, data?: HTMLImageElement) => {
				if (err || !data) {
					console.error('load text failed: ' + this.name + ' error: ' + err)

					this._data = this._DefWhiteTex;
					this._state = ResState.Loaded;

					this._onLoad();
					return;
				}

				this._data = data;
				this._width = data.width;
				this._height = data.height;
				this._state = ResState.Loaded;

				this._onLoad();
			}, this);
		}

		protected unloadImpl() {
			this._data = null;
		}
	}
}