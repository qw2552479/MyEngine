///<reference path="../utils/Reflection.ts"/>
namespace QuickEngine {
	import Type = QuickEngine.Reflection.Type;

	export class ResourceManager {

		private _resourceCacheMap: Dictionary<Resource> = new Dictionary<Resource>();
		public static readonly instance = new ResourceManager();

		constructor() {

		}

		public load<T extends Resource>(path: string, type: Type): T {
			let res = this._resourceCacheMap.getValue(path) as T;
			if (res && res.state != ResState.UnLoaded) {
				return res;
			}

			// @ts-ignore
			res = new (type.getConstructor())(path) as T;
			this._resourceCacheMap.add(path, res);

			res.load();

			return res;
		}

		public reload<T extends Resource>(url: string, type: Type): T {
			this.unload(url);
			return this.load(url, type);
		}

		public unload(url: string): void {
			let res = this._resourceCacheMap.getValue(url);
			if (!res) {
				return;
			}

			this._resourceCacheMap.remove(url);

			res.unload();
		}
	}
}