///<reference path="../core/HashObject.ts" />
namespace QE {
    export interface IScriptable {
        onLoad?: () => void;
        onUpdate?: (deltaTime: number) => void;
    }

    export function DisallowMultipleComponent(constructor) {
        constructor.__QE_DisallowMultipleComponent__ = true;
    }

    export class Component extends HashObject implements IScriptable {
        public get node(): GameObject {
            return this._node;
        }

        public get transform(): Transform {
            return this.node.transform;
        }

        public get enabled(): boolean {
            return this._enable;
        }

        public set enabled(val: boolean) {
            if (this._enable === val) {
                return;
            }

            this._enable = val;

            if (val) {
                this.enqueueComponent();
            } else {
                this.dequeueComponent();
            }
        }

        constructor() {
            super();
        }
        protected static __QE_DisallowMultipleComponent__ = false;
        protected static __QE_SerializedFieldMap?: { [key: string]: any };

        // 脚本管理
        private static s_unStartedComponentArr: Component[] = [];
        private static s_startedComponentArr: Component[] = [];

        public tag: string;

        private _needCallStart = true;

        private _node: GameObject;

        private _enable = false;

        // 脚本函数
        // 启动时调用
        public onLoad: () => void = undefined;
        // 更新时调用
        public onUpdate: (deltaTime: number) => void = undefined;
        // 调试调用
        public onDebugDraw: () => void = undefined;

        // 组件基本逻辑
        public static load() {

            const unStartedComponentArr = Component.s_unStartedComponentArr;

            for (let i = 0, len = unStartedComponentArr.length; i < len; i++) {

                const comp = unStartedComponentArr[i];

                comp._needCallStart = false;
                Component.s_startedComponentArr.push(comp);

                if (comp.onLoad) {
                    comp.onLoad.call(comp);
                }
            }

            Component.s_unStartedComponentArr.length = 0;
        }

        public static update(deltaTime: number) {
            const startedCompArr = Component.s_startedComponentArr;

            for (let i = 0, len = startedCompArr.length; i < len; i++) {
                const comp = startedCompArr[i];

                if (comp.onUpdate) {
                    comp.onUpdate.call(this, deltaTime);
                }
            }
        }

        protected onDestroy() {
            this.enabled = false;
            this._node = null;
        }

        public compareTag(tag: string): boolean {
            return this.tag === tag;
        }

        public getComponent<T extends Component>(compCls: ComponentClassType<T>): T {
            return this.node.getComponent<T>(compCls);
        }

        public getComponentInChildren<T extends Component>(compCls: ComponentClassType<T>, includeInactive: boolean = false): T {
            return this.node.getComponentInChildren<T>(compCls, includeInactive);
        }

        public GetComponentInParent<T extends Component>(compCls: ComponentClassType<T>): T {
            return this.node.GetComponentInParent<T>(compCls);
        }

        public getComponents<T extends Component>(compCls: ComponentClassType<T>): T[] {
            return this.node.getComponents<T>(compCls);
        }

        public getComponentsInChildren<T extends Component>(compCls: ComponentClassType<T>, includeInactive: boolean = false, outCompList?: T[]): T[] {
            return this.node.getComponentsInChildren<T>(compCls, includeInactive, outCompList);
        }

        public getComponentsInParent<T extends Component>(compCls: ComponentClassType<T>, includeInactive: boolean = false, outCompList?: T[]): T[] {
            return this.node.getComponentsInParent<T>(compCls, includeInactive, outCompList);
        }

        public notifyAttachNode(val: GameObject) {
            console.assert(!this._node, '重复挂载节点');
            console.assert(!!val, '挂载节点为空');
            this._node = val;
        }

        private enqueueComponent() {
            if (this._needCallStart) {
                Component.s_unStartedComponentArr.push(this);
            } else {
                Component.s_startedComponentArr.push(this);
            }
        }

        private dequeueComponent() {
            if (this._needCallStart) {
                const idx = Component.s_unStartedComponentArr.indexOf(this);

                if (idx != -1) {
                    Component.s_unStartedComponentArr.splice(idx, 1);
                }
            } else {
                const idx = Component.s_startedComponentArr.indexOf(this);

                if (idx != -1) {
                    Component.s_startedComponentArr.splice(idx, 1);
                }
            }
        }
    }

}
