namespace QE {

	export class RenderQueue {

		private readonly _solidObjects: Renderable[];
		private readonly _alphaObjects: Renderable[];

		public get solidObjects(): Renderable[] {
			return this._solidObjects;
		}

		public get alphaObjects(): Renderable[] {
			return this._alphaObjects;
		}

		public constructor() {
			this._solidObjects = [];
			this._alphaObjects = [];
		}

		public addRenderable(renderable: Renderable) {
			// TODO:添加不透明对象判断
			const mat = renderable.getMaterial();
			if (mat.opacity >= 1) {
				this._solidObjects.unshift(renderable);
			} else {
				this._alphaObjects.push(renderable);
			}
		}

		public clear(): void {
			this._solidObjects.length = 0;
			this._alphaObjects.length = 0;
		}

	}

}
