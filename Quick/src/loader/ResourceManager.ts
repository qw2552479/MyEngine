///<reference path="../utils/Reflection.ts"/>
namespace QuickEngine {
	import Type = QuickEngine.Reflection.Type;

	export class ResourceManager {

		private _resourceCacheMap: Dictionary<Resource> = new Dictionary<Resource>();

		constructor() {

		}

		public load<T extends Resource>(url: string, type: Type): T {
			let res = this._resourceCacheMap.getValue(url) as T;
			if (res && res.state != ResState.UnLoaded) {
				return res;
			}

			res = new (type.baseType().constructor)() as T;
			this._resourceCacheMap.add(url, res);

			Http.get(url, null, null, function (err, data) {
				res.load(data);
			}, res, true);

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