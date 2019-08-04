///<reference path="../utils/Reflection.ts"/>
namespace QuickEngine {
	import Type = QuickEngine.Reflection.Type;

	export class ResourceManager {

        public static readonly BUILTIN_DEF_WHITE_TEX_NAME: string = "__builtin_defWhiteTex";

		private _resourceCacheMap: Dictionary<Resource> = new Dictionary<Resource>();
		public static readonly instance = new ResourceManager();

		constructor() {

		}

        /**
		 * 构建引擎内置资源
         * @param onFinished
         */
		public makeBuiltinRes(onFinished: Function): void {

			let tex = new Texture(ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME);
			tex.mipmaps = 0;
			tex.format = PixelFormat.RGBA;
			tex.usage = TextureUsage.STATIC;
            tex.loadRawData((new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255])).buffer, 2, 2);

            this._resourceCacheMap.add(ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME, tex);

            onFinished && onFinished.call(this);
		}

		public get<T extends Resource>(path: string): T {
			return this._resourceCacheMap.getValue(path) as T;
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

        public async loadAsync<T extends Resource>(path: string, type: Type): Promise<T> {
            let res = this._resourceCacheMap.getValue(path) as T;
            if (res && res.state != ResState.UnLoaded) {
                return res;
            }

            // @ts-ignore
            res = new (type.getConstructor())(path) as T;
            this._resourceCacheMap.add(path, res);

            let promise = new Promise<T>(function (resolve, reject) {
                res.load();

                let listener = new QuickListener1<ResourceManager, T>(this, function (data) {
                    res._loadedEvent.del(listener);

                	if (data) {
						resolve(data);
                    } else {
						reject('load async failed: ' + path);
					}
                });
                res._loadedEvent.add(listener);
            });

            return promise;
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