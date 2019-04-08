///<reference path="../core/HashObject.ts" />
///<reference path="ResourceManager.ts" />
namespace QuickEngine {
	class ResourceDependence extends HashObject {

		_mainRes: Resource;
		_subRes: Resource;
		_listener: QuickListener<ResourceDependence>;

		constructor(mainRes, subRes) {
			super();
			this._mainRes = mainRes;
			this._subRes = subRes;
			this._listener = new QuickListener<ResourceDependence>(this, ResourceDependence.prototype._onLoaded);
			subRes._loadedEvent.add(this._listener);
		}

		public getMainRes() {
			return this._mainRes;
		}

		public getSubRes() {
			return this._subRes;
		}

		protected onDestroy() {
			super.onDestroy();
			this._subRes._loadedEvent.del(this._listener);
			this._listener = null;
			this._subRes = null;
			this._mainRes = null;
		}

		private _onLoaded() {
			this._mainRes._removeDependence(this._subRes);
		}
	}

	// Font,Shader,Material,Mesh,Skeleton,Texture,Audio,Video
	export abstract class Resource extends HashObject {
		protected _group: string;
		protected _isDisposed: boolean = false;
		protected _dependenceFiles: INumberDictionary<ResourceDependence>;

		protected _name: string;
		public get name(): string {
			return this._name;
		}

		public set name(val: string) {
			this._name = val;
		}

		public _priority: number;
		public get priority(): number {
			return this._priority;
		}

		public set priority(priority: number) {
			this._priority = priority;
		}

		protected _state: ResState = ResState.UnLoaded;
		public get state(): ResState {
			return this._state;
		}

		public get isComplete(): boolean {
			return this._state == ResState.Loaded;
		}

		public _loadedEvent: QuickEvent1<Resource> = new QuickEvent1<Resource>();
		public _unloadedEvent: QuickEvent1<Resource> = new QuickEvent1<Resource>();

		protected constructor(name: string, group?: string) {
			super();
			this._name = name;
			this._group = group;
		}

		public isDestroyed(): boolean {
			return this._isDisposed;
		}

		public destroy(): void {
			this._isDisposed = true;
		}

		public abstract clone(): HashObject;

		public copy(object: HashObject) {
			super.copy(object);
		}

		protected abstract loadImpl(data?: ArrayBuffer | Blob | string);

		protected abstract unloadImpl();

		public preload() {

		}

		public load(data?: ArrayBuffer | Blob | string) {
			// 已经加载
			if (this._state == ResState.Loaded || this._state == ResState.Loading) {
				return;
			}

			this._state = ResState.Loading;

			this.loadImpl(data);
		}

		public unload() {

			if (this._state != ResState.Loaded) {
				return;
			}

			this.unloadImpl();
		}

		public reload() {

		}

		protected _onLoad() {
			this._loadedEvent.dispatchEvent(this);
		}

		public _addDependence(pSubResource: Resource) {
			if (this._dependenceFiles[pSubResource.instanceId]) {
				return;
			}

			let dep = new ResourceDependence(this, pSubResource);
			this._dependenceFiles[pSubResource.instanceId] = dep;
		}

		public _removeDependence(pSubResource: Resource) {
			if (this._dependenceFiles[pSubResource.instanceId]) {
				this._dependenceFiles[pSubResource.instanceId].destroy();
				delete this._dependenceFiles[pSubResource.instanceId];
			}

			if (this._state == ResState.Loading && !this._hasDependencies()) {
				this._onLoad();
			}
		}

		public _removeAllDependence() {
			let deps = this._dependenceFiles;
			for (let k in deps) {
				deps[k].destroy();
			}
			this._dependenceFiles = {};
		}

		public _hasDependencies() {
			return Object.keys(this._dependenceFiles).length > 0;
		}
	}

}