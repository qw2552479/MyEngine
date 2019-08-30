///<reference path="../msic/HashObject.ts" />
///<reference path="ResourceManager.ts" />
///<reference path="../msic/RefObj.ts"/>
namespace QE {
    /**
     * 资源加载状态
     */
    export const enum ResState {
        // 未加载
        UnLoaded,
        // 正在加载
        Loading,
        // 加载完成
        Loaded,
        // 准备完成
        Prepared,
        // 正在准备
        Preparing,
    }

    class ResourceDependence extends HashObject {

        _mainRes: Resource;
        _subRes: Resource;
        _listener: QEListener<ResourceDependence>;

        constructor(mainRes: Resource, subRes: Resource) {
            super();
            this._mainRes = mainRes;
            this._subRes = subRes;
            this._listener = new QEListener<ResourceDependence>(this, ResourceDependence.prototype._onLoaded);
        }

        public getMainRes() {
            return this._mainRes;
        }

        public getSubRes() {
            return this._subRes;
        }

        public destroy() {
            super.destroy();
            this._listener = null;
            this._subRes = null;
            this._mainRes = null;
        }

        private _onLoaded() {
            this._mainRes._removeDependence(this._subRes);
        }
    }

    // Font,Shader,Material,Mesh,Skeleton,Texture,Audio,Video
    export abstract class Resource extends RefObj {
        protected _group: string;
        protected _dependenceFiles: Array<ResourceDependence> = [];

        protected _name: string;
        public get name(): string {
            return this._name;
        }

        public set name(name: string) {
            this._name = name;
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

        public set state(val: ResState) {
            this._state = val;
        }

        public get isComplete(): boolean {
            return this._state === ResState.Loaded;
        }

        protected constructor(name?: string, group?: string) {
            super();
            this._name = name;
            this._group = group;
        }

        public abstract clone(): HashObject;

        public copy(object: HashObject) {
            super.copy(object);
        }

        public _addDependence(subResource: Resource) {
            const dep = new ResourceDependence(this, subResource);
            this._dependenceFiles.push(dep);
        }

        public _removeDependence(pSubResource: Resource) {
            const deps = this._dependenceFiles;
            for (let i = 0, len = deps.length; i < len; i++) {
                const dep = deps[i];
                if (dep.instanceId === pSubResource.instanceId) {
                    dep.destroy();
                    deps.splice(i, 1);
                    break;
                }
            }

            if (this._state === ResState.Loading && !this._hasDependencies()) {

            }
        }

        public _removeAllDependence() {
            const deps = this._dependenceFiles;
            for (const k in deps) {
                deps[k].destroy();
            }
            this._dependenceFiles.length = 0;
        }

        public _hasDependencies() {
            return this._dependenceFiles.length > 0;
        }
    }
}
